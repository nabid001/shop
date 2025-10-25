"use server";

import { AddressType, Response } from "@/types";
import { db } from "@repo/drizzle-config";
import { AddressTable } from "@repo/drizzle-config/schemas/address";
import { eq } from "drizzle-orm";

export type VeriFiedGetAddressError =
  | "ADDRESS_NOT_FUND"
  | "SERVER_ERROR"
  | "USER_ID_NOT_FOUND";

export const getAddress = async (
  userId: string
): Promise<Response<VeriFiedGetAddressError, AddressType[]>> => {
  if (!userId)
    return {
      success: false,
      error: "USER_ID_NOT_FOUND",
      message: "User Not Found | User Is Not Login",
    };

  const address = await db
    .select()
    .from(AddressTable)
    .where(eq(AddressTable.userId, userId));

  if (!address.length)
    return {
      success: false,
      error: "ADDRESS_NOT_FUND",
      message: "You Don't Have Any Address Yet",
    };

  return { success: true, data: address, message: "OK" };
};

export const createAddress = async () => {};
