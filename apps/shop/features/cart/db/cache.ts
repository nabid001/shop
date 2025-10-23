import { getGlobalTag, getUserTag } from "@/lib/cache";
import { revalidateTag } from "next/cache";

export const getCartGlobalTag = () => {
  return getGlobalTag("carts");
};

export const getCartUserIdTag = ({ id }: { id: string }) => {
  return getUserTag("carts", id);
};

export const revalidateCartCache = (id: string) => {
  revalidateTag(getCartGlobalTag(), "max");
  revalidateTag(getCartUserIdTag({ id }), "max");
};
