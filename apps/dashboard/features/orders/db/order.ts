"use server";

import { cache } from "react";
import { db } from "@repo/drizzle-config";
import { OrdersTable } from "@repo/drizzle-config/schemas/order";
import { desc, eq } from "drizzle-orm";
import { cacheLife } from "next/cache";
import { client } from "@repo/sanity-config/client";

export const getOrders = cache(async () => {
  // "use cache";
  // cacheLife("days");

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
  // "use cache";
  // cacheLife("days");

  try {
    const res = await db.query.OrdersTable.findFirst({
      where: eq(OrdersTable.id, id),
      with: {
        items: true,
      },
    });

    if (!res) throw new Error("Failed To Fetch Order Data");
    console.log(res.items);

    const productIds = res.items.map((item) => item.productId);

    const [images] = await client.fetch(
      `*[_type == "product" && _id in $ids && status == "public"]{
          "image": variants.image.asset->url
        }`,
      { ids: productIds }
    );

    // console.log(images);
    if (!images) throw new Error("Failed To Fetch Image Url From Sanity");

    const newRes = res.items.map((val) => {
      return { ...val, ["imageUrl"]: images.image };
    });

    return newRes;
  } catch (error) {
    console.log(error);
  }
});
