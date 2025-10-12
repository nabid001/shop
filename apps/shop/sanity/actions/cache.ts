import { getGlobalTag, getIdTag } from "@/lib/cache";
import { revalidateTag } from "next/cache";

export const productIdTag = (id: string) => {
  return getIdTag("products", id);
};

export const categoryIdTag = (id: string) => {
  return getIdTag("categorySection", id);
};

export const bannerIdTag = (id: string) => {
  return getIdTag("heroBanner", id);
};

export const revalidateProductCache = (id: string) => {
  revalidateTag(productIdTag(id));
  revalidateTag(getGlobalTag("products"));
};

export const revalidateCategoryCache = (id: string) => {
  revalidateTag(categoryIdTag(id));
  revalidateTag(getGlobalTag("categorySection"));
};

export const revalidateBannerCache = (id: string) => {
  revalidateTag(bannerIdTag(id));
  revalidateTag(getGlobalTag("heroBanner"));
};
