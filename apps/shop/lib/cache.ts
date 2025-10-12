import { revalidateTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const cacheTagPrefix = [
  "heroBanner",
  "categorySection",
  "homeProducts",
] as const;
type HomeCacheTag = (typeof cacheTagPrefix)[number];

export const nameCacheTag = (type: HomeCacheTag, tag: string) => {
  return cacheTag(`${type}:id-${tag}`);
};

export const revalidateTags = (type: HomeCacheTag, tag: string) => {
  revalidateTag(`${type}:id-${tag}`);
};
