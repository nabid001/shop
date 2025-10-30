"use server";

import { db } from "@repo/drizzle-config";
import { CartTable } from "@repo/drizzle-config/schemas/cart";
import { AddToCartSchema } from "../validation";
import { and, eq } from "drizzle-orm";
import {
  Response,
  TAddToCart,
  VeriFiedError as VerifiedAddToCartError,
} from "@/types";
import { updateTag } from "next/cache";
import { revalidateCartCache } from "@/features/cart/db/cache";

export const addToCart = async (
  data: TAddToCart
): Promise<Response<VerifiedAddToCartError>> => {
  const safeData = AddToCartSchema.safeParse(data);
  if (safeData.error)
    return {
      success: false,
      error: "VALIDATION_ERROR",
      message: "Zod Filed To Validate Values",
    };

  const existingProduct = await db.query.CartTable.findFirst({
    where: and(
      eq(CartTable.userId, safeData.data.userId),
      eq(CartTable.productId, safeData.data.productId),
      eq(CartTable.color, safeData.data.color),
      eq(CartTable.size, safeData.data.size)
    ),
    columns: {
      id: true,
      quantity: true,
    },
  });

  if (existingProduct) {
    return {
      success: false,
      message: "Product Already Exist",
      error: "PRODUCT_ALREADY_IN_CART",
    };
  }

  const [res] = await db.insert(CartTable).values(safeData.data).returning();

  if (!res)
    return {
      success: false,
      message: "Some thing wrong happen!",
      error: "DRIZZLE_ERROR",
    };

  revalidateCartCache(safeData.data.userId);
  return { message: "Product Added Successfully", success: true };
};
