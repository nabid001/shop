"use server";

import { cache } from "react";
import { db } from "@repo/drizzle-config";
import { OrdersTable, statusEnums } from "@repo/drizzle-config/schemas/order";
import { desc, eq } from "drizzle-orm";
import { client } from "@repo/sanity-config/client";
import { revalidatePath, updateTag } from "next/cache";

export const getOrders = cache(async () => {
  try {
    const res = await db.query.OrdersTable.findMany({
      orderBy: [desc(OrdersTable.createdAt)],
    });

    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getOrderById = cache(async ({ id }: { id: string }) => {
  try {
    // 1️⃣ Fetch order + items + user
    const res = await db.query.OrdersTable.findFirst({
      where: eq(OrdersTable.id, id),
      with: {
        items: true,
        user: {
          columns: {
            email: true,
            picture: true,
            username: true,
          },
        },
      },
    });

    if (!res) throw new Error("Failed To Fetch Order Data");

    // 2️⃣ Collect all product IDs
    const productIds = res.items.map((item) => item.productId);

    // 3️⃣ Fetch product images + name + price from Sanity
    const products = await client.fetch(
      `*[_type == "product" && _id in $ids && status == "public"]{
        "image": variants.image.asset->url,
        _id,
        name,
        "price": variants.price
      }`,
      { ids: productIds }
    );

    // 4️⃣ Create a fast map for O(1) lookup
    const productMap = Object.fromEntries(products.map((p: any) => [p._id, p]));

    // 5️⃣ Merge products into each order item
    const itemsWithProduct = res.items.map((item) => ({
      ...item,
      product: productMap[item.productId] ?? null,
    }));

    // 6️⃣ Final combined result
    const finalOrder = {
      ...res,
      items: itemsWithProduct,
    };

    return finalOrder;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

type OrderStatus = (typeof statusEnums.enumValues)[number];

const revalidateOrderCache = (userId: string) => {
  updateTag("global:order");
  updateTag(`user:${userId}-order`);
};

const SHOP_ORIGIN = process.env.SHOP_ORIGIN ?? "http://localhost:3000";

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus
) => {
  if (!orderId) throw new Error("OrderId is required");
  if (!statusEnums.enumValues.includes(status)) {
    throw new Error("Invalid order status");
  }

  const [updatedOrder] = await db
    .update(OrdersTable)
    .set({ orderStatus: status })
    .where(eq(OrdersTable.id, orderId))
    .returning({
      id: OrdersTable.id,
      userId: OrdersTable.userId,
      orderStatus: OrdersTable.orderStatus,
    });

  if (!updatedOrder) throw new Error("Failed to update order status");

  revalidatePath("/orders");
  revalidatePath(`/view/${orderId}`);

  // kick shop app caches so customer views stay fresh
  try {
    await fetch(`${SHOP_ORIGIN}/api/revalidate/order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: updatedOrder.userId }),
    });
  } catch (error) {
    console.error("Failed to revalidate shop order cache", error);
  }

  return updatedOrder;
};
