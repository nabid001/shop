"use server";

import { db } from "@repo/drizzle-config";
import { OrdersTable } from "@repo/drizzle-config/schemas/order";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { getOrderUserTag } from "./cache/order-cache";

export const getOrders = async (userId: string) => {
  "use cache";
  cacheTag(getOrderUserTag(userId));

  try {
    const res = await db
      .select({
        id: OrdersTable.id,
        totalAmount: OrdersTable.totalAmount,
        paymentMethod: OrdersTable.paymentMethod,
        orderStatus: OrdersTable.orderStatus,
        createdAt: OrdersTable.createdAt,
      })
      .from(OrdersTable)
      .where(eq(OrdersTable.userId, userId));

    return res;
  } catch (error) {
    console.log(error);
  }
};
