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
import {
  THeroBanner,
  TCategory,
  TNewArrival,
  TFeatured,
  TBestseller,
} from "@/types";
import { cacheTag } from "next/cache";
import { getSanityIdTag, sanityTag } from "@/sanity/actions/cache";

export const getHeroBanner = cache(async (): Promise<THeroBanner> => {
  "use cache";
  cacheTag(sanityTag("heroBanner"));

  try {
    const res: THeroBanner = await client.fetch(HERO_BANNER);
    res.map((val) => {
      cacheTag(getSanityIdTag(val._id));
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as THeroBanner;
  }
});

export const getCategory = cache(async (): Promise<TCategory> => {
  "use cache";
  cacheTag(sanityTag("categorySection"));

  try {
    const res: TCategory = await client.fetch(CATEGORY);
    res.map((val) => {
      cacheTag(getSanityIdTag(val._id));
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TCategory;
  }
});

export const getNewArrival = cache(async (): Promise<TNewArrival> => {
  "use cache";
  cacheTag(sanityTag("homeProducts"));

  try {
    const res: TNewArrival = await client.fetch(NEW_ARRIVAL);
    res.map((val) => {
      cacheTag(getSanityIdTag(val._id));
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TNewArrival;
  }
});

export const getFeatured = cache(async (): Promise<TFeatured> => {
  "use cache";
  cacheTag(sanityTag("homeProducts"));

  try {
    const res: TFeatured = await client.fetch(FEATURED);
    res.map((val) => {
      cacheTag(getSanityIdTag(val._id));
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TFeatured;
  }
});

export const getBestseller = cache(async (): Promise<TBestseller> => {
  "use cache";
  cacheTag(sanityTag("homeProducts"));

  try {
    const res: TBestseller = await client.fetch(BESTSELLER);
    res.map((val) => {
      cacheTag(getSanityIdTag(val._id));
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TBestseller;
  }
});
