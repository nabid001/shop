"use server";

import { db } from "@/drizzle/db";
import { CartTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getCartLength = cache(
  async ({ userId }: { userId: string }): Promise<number> => {
    const items = await db.query.CartTable.findMany({
      columns: {
        id: true,
      },
      where: eq(CartTable.userId, userId),
    });

    return items.length;
  }
);
