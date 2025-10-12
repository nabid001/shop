"use server";

import { client } from "@repo/sanity-config/client";
import {
  BESTSELLER,
  CATEGORY,
  FEATURED,
  HERO_BANNER,
  NEW_ARRIVAL,
} from "../query";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { cache } from "react";

export type THeroBanner = {
  _id: string;
  _type: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryButton: {
    name: string;
    url: string;
  };
  secondaryButton: {
    name: string;
    url: string;
  };
}[];

export type TCategory = {
  _id: string;
  name: string;
  subtitle: string;
  actionButton: {
    name: string;
    url: string;
  };
  image: string;
}[];

export type TNewArrival = {
  _id: string;
  _type: string;
  name: string;
  price: number;
  salePrice: number;
  image: {
    url: string;
  };
  category: string;
}[];

export type TFeatured = {
  _id: string;
  _type: string;
  name: string;
  price: number;
  salePrice: number;
  image: {
    url: string;
  };
  category: string;
  featured: boolean;
}[];

export type TBestseller = {
  _id: string;
  _type: string;
  name: string;
  price: number;
  salePrice: number;
  image: {
    url: string;
  };
  category: string;
}[];

export const getHeroBanner = cache(async (): Promise<THeroBanner> => {
  "use cache";
  try {
    const res: THeroBanner = await client.fetch(HERO_BANNER);
    res.map((val) => {
      cacheTag(`heroBanner-id:${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as THeroBanner;
  }
});

export const getCategory = cache(async (): Promise<TCategory> => {
  "use cache";
  try {
    const res: TCategory = await client.fetch(CATEGORY);
    res.map((val) => {
      cacheTag(`categorySection-id:${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TCategory;
  }
});

export const getNewArrival = cache(async (): Promise<TNewArrival> => {
  "use cache";
  try {
    const res: TNewArrival = await client.fetch(NEW_ARRIVAL);
    res.map((val) => {
      cacheTag(`newArrival-id:${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TNewArrival;
  }
});

export const getFeatured = cache(async (): Promise<TFeatured> => {
  "use cache";
  try {
    const res: TFeatured = await client.fetch(FEATURED);
    res.map((val) => {
      cacheTag(`featured-id:${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TFeatured;
  }
});

export const getBestseller = cache(async (): Promise<TBestseller> => {
  "use cache";
  try {
    const res: TBestseller = await client.fetch(BESTSELLER);
    res.map((val) => {
      cacheTag(`bestseller-id:${val._id}`);
    });
    return res;
  } catch (error) {
    console.log("Server error", error);
    return [] as TBestseller;
  }
});
