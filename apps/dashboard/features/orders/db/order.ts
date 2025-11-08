"use server";

import { cache } from "react";
import { db } from "@repo/drizzle-config";
import { OrdersTable } from "@repo/drizzle-config/schemas/order";
import { and, desc, eq } from "drizzle-orm";
import { cacheLife } from "next/cache";

export const getOrders = cache(async () => {
  "use cache";
  cacheLife("days");

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
  "use cache";
  cacheLife("days");

  try {
    const res = await db.query.OrdersTable.findFirst({
      where: eq(OrdersTable.id, id),
      with: {
        items: true,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
});
