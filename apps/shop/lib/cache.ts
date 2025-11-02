type CACHE_TAG =
  | "products"
  | "users"
  | "carts"
  | "category"
  | "address"
  | "order"
  | "sanity";

export type SANITY_TAG = "heroBanner" | "categorySection" | "homeProducts";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id:${id}-${tag}` as const;
}

export function getUserTag(tag: CACHE_TAG, userId: string) {
  return `user:${userId}-${tag}` as const;
}

export const getSanityTag = (tag: SANITY_TAG) => {
  return `sanity:${tag}`;
};
