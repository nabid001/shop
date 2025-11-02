import { getGlobalTag, getUserTag } from "@/lib/cache";
import { updateTag } from "next/cache";

export const getAddressGlobalTag = () => {
  return getGlobalTag("address");
};

export const getAddressUserTag = (id: string) => {
  return getUserTag("address", id);
};

export const revalidateAddressCache = (id: string) => {
  updateTag(getAddressGlobalTag());
  updateTag(getAddressUserTag(id));
};
