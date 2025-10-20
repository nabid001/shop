"use server";

import { PRODUCT_BY_ID, RELATED_PRODUCTS } from "@/features/products/db/query";
import {
  Response,
  TProductById,
  TRelatedProduct,
  VerifiedProductByIdError,
  VerifiedRelatedProductError,
} from "@/types";
import { client } from "@repo/sanity-config/client";
import { cache } from "react";

export const getProductById = cache(
  async (
    slug: string
  ): Promise<Response<VerifiedProductByIdError, TProductById>> => {
    if (!slug)
      return {
        success: false,
        message: "Slug Is Require",
        error: "SLUG_REQUIRE",
      };

    const product = await client.fetch<TProductById>(PRODUCT_BY_ID(slug));

    if (!product)
      return {
        success: false,
        message: "Product Not Found",
        error: "PRODUCT_NOT_FOUND",
      };

    return { success: true, message: "Ok", data: product };
  }
);

export const getRelatedProducts = async ({
  category,
  id,
}: {
  category: string;
  id: string;
}): Promise<Response<VerifiedRelatedProductError, TRelatedProduct>> => {
  console.log(category);
  if (!category)
    return {
      success: false,
      message: "Category Is Required",
      error: "CATEGORY_REQUIRED",
    };

  const products = await client.fetch<TRelatedProduct>(
    RELATED_PRODUCTS(category, id)
  );

  if (!products.length) {
    return {
      success: false,
      message: "Product Not Found",
      error: "PRODUCT_NOT_FOUND",
    };
  }

  console.log(products);

  return {
    success: true,
    message: "OK",
    data: products,
  };
};
