type CACHE_TAG =
  | "products"
  | "users"
  | "heroBanner"
  | "categorySection"
  | "homeProducts"
  | "carts"
  | "category"
  | "address"
  | "order";

export function getGlobalTag(tag: CACHE_TAG) {
  return `global:${tag}` as const;
}

export function getIdTag(tag: CACHE_TAG, id: string) {
  return `id:${id}-${tag}` as const;
}

export function getUserTag(tag: CACHE_TAG, userId: string) {
  return `user:${userId}-${tag}` as const;
}
