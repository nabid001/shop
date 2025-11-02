"use server";

import {
  PRODUCT_BY_ID,
  PRODUCTS,
  RELATED_PRODUCTS,
} from "@/features/products/db/query";
import {
  Response,
  TProductById,
  TProducts,
  TProductsResult,
  TRelatedProduct,
  VerifiedProductByIdError,
  VerifiedProductError,
  VerifiedRelatedProductError,
} from "@/types";
import { client } from "@repo/sanity-config/client";
import { cache } from "react";
import { GetProductsSchema } from "../validation";
import { cacheTag } from "next/cache";
import { getSanityIdTag, sanityTag } from "@/sanity/actions/cache";

export const getAllProducts = cache(async () => {
  try {
    const res = await client.fetch(`*[_type == "product" && status == "public"]{
      slug
      }`);

    return res;
  } catch (error) {
    console.log(error);
  }
});

export const getProductById = cache(
  async (
    slug: string
  ): Promise<Response<VerifiedProductByIdError, TProductById>> => {
    "use cache";

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

    cacheTag(getSanityIdTag(product._id));
    return { success: true, message: "Ok", data: product };
  }
);

export const getRelatedProducts = cache(
  async ({
    category,
    id,
  }: {
    category: string;
    id: string;
  }): Promise<Response<VerifiedRelatedProductError, TRelatedProduct>> => {
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

    return {
      success: true,
      message: "OK",
      data: products,
    };
  }
);

export const getProducts = cache(
  async (
    values: TProducts
  ): Promise<Response<VerifiedProductError, TProductsResult>> => {
    "use cache";
    cacheTag(sanityTag("products"));

    const { error, data } = GetProductsSchema.safeParse(values);

    if (error)
      return {
        message: `${error}`,
        success: false,
        error: "VALIDATION_ERROR",
      };

    const res = await client.fetch<TProductsResult>(
      PRODUCTS({
        search: data.search,
        category: data.category,
        sorting: data.sorting,
      })
    );

    if (!res.length)
      return {
        success: false,
        error: "PRODUCT_NOT_FOUND",
        message: "Product Not Found",
      };

    return {
      success: true,
      message: "Ok",
      data: res,
    };
  }
);
