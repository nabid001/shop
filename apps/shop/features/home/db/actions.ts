"use server";

import { client } from "@repo/sanity-config/client";
import {
  BESTSELLER,
  CATEGORY,
  FEATURED,
  HERO_BANNER,
  NEW_ARRIVAL,
} from "./query";
import { cache } from "react";
import { nameCacheTag } from "@/lib/cache";
import {
  THeroBanner,
  TCategory,
  TNewArrival,
  TFeatured,
  TBestseller,
} from "@/types";

export const getHeroBanner = cache(async (): Promise<THeroBanner> => {
  // "use cache";
  try {
    const res: THeroBanner = await client.fetch(HERO_BANNER);
    // res.map((val) => {
    //   nameCacheTag("heroBanner", `${val._id}`);
    // });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as THeroBanner;
  }
});

export const getCategory = cache(async (): Promise<TCategory> => {
  // "use cache";
  try {
    const res: TCategory = await client.fetch(CATEGORY);
    // res.map((val) => {
    //   nameCacheTag("categorySection", `${val._id}`);
    // });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TCategory;
  }
});

export const getNewArrival = cache(async (): Promise<TNewArrival> => {
  // "use cache";
  try {
    const res: TNewArrival = await client.fetch(NEW_ARRIVAL);
    // res.map((val) => {
    //   nameCacheTag("homeProducts", `${val._id}`);
    // });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TNewArrival;
  }
});

export const getFeatured = cache(async (): Promise<TFeatured> => {
  // "use cache";
  try {
    const res: TFeatured = await client.fetch(FEATURED);
    // res.map((val) => {
    //   nameCacheTag("homeProducts", `${val._id}`);
    // });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TFeatured;
  }
});

export const getBestseller = cache(async (): Promise<TBestseller> => {
  // "use cache";
  try {
    const res: TBestseller = await client.fetch(BESTSELLER);
    // res.map((val) => {
    //   nameCacheTag("homeProducts", `${val._id}`);
    // });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TBestseller;
  }
});
