"use server";

import { db } from "@repo/drizzle-config";
import { CartTable } from "@repo/drizzle-config/schemas/cart";
import { getCartUserIdTag } from "./cache";
import { and, eq } from "drizzle-orm";
import {
  unstable_cacheTag as cacheTag,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import {
  Response,
  TCartProduct,
  VerifiedGetCartError,
  TOnlyImage,
} from "@/types";
import { client } from "@repo/sanity-config/client";
import { cache } from "react";

export const getCartProducts = cache(
  async (
    userId: string
  ): Promise<Response<VerifiedGetCartError, TCartProduct>> => {
    // "use cache";
    // cacheTag(getCartUserIdTag({ id: userId }));

    if (!userId)
      return {
        success: false,
        error: "USERID_REQUIRE",
        message: "User Id is required",
      };

    const res = await db.query.CartTable.findMany({
      where: eq(CartTable.userId, userId),
    });

    if (!res.length) {
      return {
        success: false,
        error: "EMPTY_CART",
        message: "Cart Is Empty",
      };
    }

    const productIds = res.map((item) => item.productId);

    const images = await client.fetch<TOnlyImage>(
      `*[_type == "product" && status == "public" && _id in $productIds]{
      _id,
      name,
      slug,
      variants[0]{
        "image": image.asset->url,
        price,
        salePrice
      },
      "category": category->name,
    }`,
      { productIds }
    );

    // Map the extra product data (name, price, salePrice, category) to product ids for easy lookup
    const productDataById = Object.fromEntries(
      images.map((p) => [
        p._id,
        {
          image: p.variants?.image ?? "",
          name: p.name || "",
          price: p.variants?.price ?? null,
          salePrice: p.variants?.salePrice ?? null,
          category: p.category || "",
          slug: p.slug.current || "",
        },
      ])
    );

    // Attach all available product data (including image and name) to each cart item
    const cartWithImages = res.map((item) => ({
      ...item,
      ...(productDataById[item.productId] || {}),
    }));

    return { success: true, message: "Ok", data: cartWithImages };
  }
);

export const removeFromCart = cache(
  async ({ userId, productId }: { userId: string; productId: string }) => {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      } else if (!productId) {
        throw new Error("Product ID is required");
      }

      await db
        .delete(CartTable)
        .where(and(eq(CartTable.userId, userId), eq(CartTable.id, productId)))
        .returning();

      // revalidateTag(getCartUserIdTag({ id: userId }), "max");
      revalidatePath("/cart");

      return { success: true };
    } catch (error) {
      console.log("Failed to remove from cart", error);
      throw new Error("Failed to remove from cart");
    }
  }
);

export const getCartLength = cache(
  async ({ userId }: { userId: string }): Promise<number> => {
    // "use cache";
    // cacheTag(getCartUserIdTag({ id: userId }));

    const items = await db.query.CartTable.findMany({
      columns: {
        id: true,
      },
      where: eq(CartTable.userId, userId),
    });

    return items.length;
  }
);
