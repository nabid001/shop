"use server";

import { client } from "@repo/sanity-config/client";
import { CATEGORY } from "./query";
import { TGetCategory } from "@/types";
import { unstable_cacheTag } from "next/cache";
import { getCategoryIdTag } from "./cache/category";
import { cache } from "react";

export const getCategory = cache(async (): Promise<TGetCategory> => {
  // "use cache";
  try {
    const res = await client.fetch<TGetCategory>(CATEGORY);

    if (res === null) {
      throw new Error("Category not found");
    }

    // res.map((item) => unstable_cacheTag(getCategoryIdTag(item._id)));

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
});
