import { getGlobalTag, getUserTag } from "@/lib/cache";
import { updateTag } from "next/cache";

export const getOrderGlobalTag = () => {
  return getGlobalTag("order");
};

export const getOrderUserTag = (id: string) => {
  return getUserTag("order", id);
};

export const revalidateOrderCache = (id: string) => {
  updateTag(getOrderGlobalTag());
  updateTag(getOrderUserTag(id));
};
