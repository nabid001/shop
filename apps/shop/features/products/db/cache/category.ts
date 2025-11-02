import { getGlobalTag, getIdTag } from "@/lib/cache";
import { revalidateTag } from "next/cache";

export const getCategoryGlobalTag = () => {
  return getGlobalTag("category");
};

export const getCategoryIdTag = (id: string) => {
  return getIdTag("category", id);
};

export const revalidateCategoryCache = (id: string) => {
  revalidateTag(getCategoryGlobalTag());
  revalidateTag(getCategoryIdTag(id));
};
