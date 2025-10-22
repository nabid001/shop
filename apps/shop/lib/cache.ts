import { revalidateTag, unstable_cacheTag } from "next/cache";

type CACHE_TAG =
  | "products"
  | "users"
  | "heroBanner"
  | "categorySection"
  | "homeProducts"
  | "carts"
  | "category";

export const nameCacheTag = (type: CACHE_TAG, tag: string) => {
  return unstable_cacheTag(`${type}:id-${tag}`);
};

export const revalidateTags = (type: CACHE_TAG, tag: string) => {
  revalidateTag(`${type}:id-${tag}`);
};

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id:${id}-${tag}` as const;
}

export function getUserTag(tag: CACHE_TAG, userId: string) {
  return `user:${userId}-${tag}` as const;
}
