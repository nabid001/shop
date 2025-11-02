"use server";

import { client } from "@repo/sanity-config/client";
import { CATEGORY } from "./query";
import { TGetCategory } from "@/types";
import { cacheTag } from "next/cache";
import { cache } from "react";
import { getSanityIdTag, sanityTag } from "@/sanity/actions/cache";

export const getCategory = cache(async (): Promise<TGetCategory> => {
  "use cache";
  cacheTag(sanityTag("categorySection"));

  try {
    const res = await client.fetch<TGetCategory>(CATEGORY);

    if (res === null) {
      throw new Error("Category not found");
    }

    res.map((item) => {
      cacheTag(getSanityIdTag(item._id));
    });

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
});
