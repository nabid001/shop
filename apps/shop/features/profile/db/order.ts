"use server";

import { db } from "@repo/drizzle-config";
import { CancelReason, OrdersTable } from "@repo/drizzle-config/schemas/order";
import { and, desc, eq, isNull } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { getOrderUserTag, revalidateOrderCache } from "./cache/order-cache";
import { client } from "@repo/sanity-config/client";

export const getOrders = async (userId: string) => {
  "use cache";
  cacheTag(getOrderUserTag(userId));

  try {
    const res = await db.query.OrdersTable.findMany({
      where: and(
        eq(OrdersTable.userId, userId),
        // eq(OrdersTable.isCanceled, false)
        isNull(OrdersTable.isCanceled)
      ),
      with: {
        items: true,
      },
      // columns: {
      //   id: true,
      //   totalAmount: true,
      //   paymentMethod: true,
      //   orderStatus: true,
      //   createdAt: true,
      // },
      orderBy: desc(OrdersTable.createdAt),
    });

    if (!res.length) throw new Error("Failed to fetch Orders");

    // Flatten the array of arrays and extract productId from each item
    const items = res.flatMap((order) => order.items);
    const ids = [
      ...new Set(
        items.map((item) => (item as { productId: string }).productId)
      ),
    ];

    const images = await client.fetch(
      `*[_type == "product" && _id in $ids && status == "public"]{
        _id,
        name,
        "image": variants.image.asset->url,
        "price": variants.salePrice
      }`,
      { ids: ids }
    );

    // Create a map of productId -> product for quick lookup
    const productMap = Object.fromEntries(
      images.map(
        (p: {
          _id: string;
          image: string | string[];
          name: string;
          price: number;
        }) => [p._id, p]
      )
    );

    // console.log(productMap);

    // Combine orders with their product images
    // Map over each order, then map over each order's items
    const ordersWithProducts = res.map((order) => ({
      ...order,
      items: (order.items as { productId: string }[]).map((item) => ({
        ...item,
        product: productMap[item.productId] ?? null,
      })),
    }));

    return ordersWithProducts;
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async ({
  orderId,
  cancelReason,
  userId,
}: {
  orderId: string;
  cancelReason: CancelReason;
  userId: string;
}) => {
  if (!orderId) throw new Error("OrderId is required");
  if (!cancelReason) throw new Error("Cancel reason is required");

  try {
    const res = await db
      .update(OrdersTable)
      .set({
        isCanceled: true,
        cancelReason,
      })
      .where(eq(OrdersTable.id, orderId))
      .returning({ id: OrdersTable.id });

    if (!res) throw new Error("Failed to cancel order!");

    revalidateOrderCache(userId);
    return res;
  } catch (error) {
    console.log(error);
  }
};
