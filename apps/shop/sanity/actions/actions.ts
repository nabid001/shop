"use server";

import {
  BESTSELLER,
  CATEGORY,
  FEATURED,
  HERO_BANNER,
  NEW_ARRIVAL,
} from "../query";
import {
  THeroBanner,
  TCategory,
  TNewArrival,
  TFeatured,
  TBestseller,
} from "@/types";
import { client } from "@repo/sanity-config/client";
import { getIdTag } from "@/lib/cache";

export const getHeroBanner = async (): Promise<THeroBanner> => {
  "use cache";
  try {
    const res: THeroBanner = await client.fetch(HERO_BANNER);
    res.map((val) => {
      getIdTag("heroBanner", `${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as THeroBanner;
  }
};

export const getCategory = async (): Promise<TCategory> => {
  "use cache";
  try {
    const res: TCategory = await client.fetch(CATEGORY);
    res.map((val) => {
      getIdTag("categorySection", `${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TCategory;
  }
};

export const getNewArrival = async (): Promise<TNewArrival> => {
  "use cache";

  try {
    const res: TNewArrival = await client.fetch(NEW_ARRIVAL);
    res.map((val) => {
      getIdTag("products", `${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TNewArrival;
  }
};

export const getFeatured = async (): Promise<TFeatured> => {
  "use cache";

  try {
    const res: TFeatured = await client.fetch(FEATURED);
    res.map((val) => {
      getIdTag("products", `${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TFeatured;
  }
};

export const getBestseller = async (): Promise<TBestseller> => {
  "use cache";

  try {
    const res: TBestseller = await client.fetch(BESTSELLER);
    res.map((val) => {
      getIdTag("products", `${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TBestseller;
  }
};
