import { getGlobalTag, getUserTag } from "@/lib/cache";
import { updateTag } from "next/cache";

export const getCartGlobalTag = () => {
  return getGlobalTag("carts");
};

export const getCartUserIdTag = (id: string) => {
  return getUserTag("carts", id);
};

export const revalidateCartCache = (id: string) => {
  updateTag(getCartGlobalTag());
  updateTag(getCartUserIdTag(id));
};
