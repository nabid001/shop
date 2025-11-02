"use server";

import { cacheTag } from "next/cache";
import { db } from "@repo/drizzle-config";
import { AddressTable } from "@repo/drizzle-config/schemas/address";
import { and, eq } from "drizzle-orm";
import {
  getAddressUserTag,
  revalidateAddressCache,
} from "./cache/address-cache";
import z from "zod";
import { AddAddressSchema } from "../validation";

export const getAddress = async (userId: string) => {
  "use cache";
  cacheTag(getAddressUserTag(userId));

  try {
    const res = await db
      .select()
      .from(AddressTable)
      .where(eq(AddressTable.userId, userId));

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAddress = async ({
  userId,
  addressId,
}: {
  userId: string;
  addressId: string;
}) => {
  try {
    const [deletedAddress] = await db
      .delete(AddressTable)
      .where(
        and(eq(AddressTable.userId, userId), eq(AddressTable.id, addressId))
      )
      .returning({ id: AddressTable.id });

    if (!deletedAddress) throw new Error("Failed to delete address");

    revalidateAddressCache(userId);
    return deletedAddress;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createAddress = async (
  values: z.infer<typeof AddAddressSchema>,
  { userId }: { userId: string }
) => {
  try {
    const [address] = await db
      .insert(AddressTable)
      .values({ ...values, userId })
      .returning({ id: AddressTable.id });

    if (!address) throw new Error("Failed to create address");

    revalidateAddressCache(userId);
    return address;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
