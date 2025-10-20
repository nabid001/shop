"use server";

import { db } from "@repo/drizzle-config";
import { CartTable } from "@repo/drizzle-config/schemas/cart";
import { AddToCartSchema } from "../validation";
import { revalidateTag } from "next/cache";
import { getCartUserIdTag } from "@/features/cart/db/cache";
import { and, eq } from "drizzle-orm";
import {
  Response,
  TAddToCart,
  VeriFiedError as VerifiedAddToCartError,
} from "@/types";

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

  // if (existingProduct) {
  //   const [res] = await db
  //     .update(CartTable)
  //     .set({ quantity: existingProduct.quantity + 1 })
  //     .where(
  //       and(
  //         eq(CartTable.userId, safeData.data.userId),
  //         eq(CartTable.productId, safeData.data.productId),
  //         eq(CartTable.color, safeData.data.color),
  //         eq(CartTable.size, safeData.data.size)
  //       )
  //     )

  //     .returning({ id: CartTable.id });

  //   if (res.id)
  //     return {
  //       success: true,
  //       message: "Product Added Successfully",
  //     };
  // }

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

  revalidateTag(getCartUserIdTag({ id: data.userId }));
  return { message: "Product Added Successfully", success: true };
};
