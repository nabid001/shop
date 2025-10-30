import { getGlobalTag, getIdTag } from "@/lib/cache";
import { updateTag } from "next/cache";

export const getUserGlobalTag = () => {
  return getGlobalTag("users");
};

export const getUserIdTag = (id: string) => {
  return getIdTag("users", id);
};

export const revalidateUserCache = (id: string) => {
  updateTag(getUserGlobalTag());
  updateTag(getUserIdTag(id));
};
