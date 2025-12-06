"use server";

import { db } from "@repo/drizzle-config";
import { OrdersTable } from "@repo/drizzle-config/schemas/order";
import { desc, eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { getOrderUserTag } from "./cache/order-cache";
import { client } from "@repo/sanity-config/client";

export const getOrderDetails = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  "use cache";
  cacheTag(getOrderUserTag(userId));
};

export const getOrders = async (userId: string) => {
  "use cache";
  cacheTag(getOrderUserTag(userId));

  try {
    const res = await db.query.OrdersTable.findMany({
      where: eq(OrdersTable.userId, userId),
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
