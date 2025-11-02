import { getGlobalTag, getIdTag, getSanityTag, SANITY_TAG } from "@/lib/cache";
import { revalidateTag } from "next/cache";

export const getSanityGlobalTag = () => {
  return getGlobalTag("sanity");
};

export const sanityTag = (tag: SANITY_TAG) => {
  return getSanityTag(tag);
};

export const getSanityIdTag = (id: string) => {
  return getIdTag("sanity", id);
};

export const revalidateSanityCache = (tag: SANITY_TAG, id: string) => {
  revalidateTag(getSanityGlobalTag(), "max");
  revalidateTag(sanityTag(tag), "max");
  revalidateTag(getSanityIdTag(id), "max");
};
