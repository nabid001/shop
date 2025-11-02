"use server";

import { revalidateCartCache } from "@/features/cart/db/cache";
import { CheckoutProduct } from "@/features/checkout/store";
import { revalidateAddressCache } from "@/features/profile/db/cache/address-cache";
import { revalidateOrderCache } from "@/features/profile/db/cache/order-cache";
import { Response } from "@/types";
import { db } from "@repo/drizzle-config";
import { AddressTable } from "@repo/drizzle-config/schemas/address";
import { CartTable } from "@repo/drizzle-config/schemas/cart";
import {
  OrderItemTable,
  OrdersTable,
  PaymentMethod,
} from "@repo/drizzle-config/schemas/order";
import { client } from "@repo/sanity-config/client";
import { and, eq, inArray } from "drizzle-orm";

export type TCreateOrder = {
  totalAmount: number;
  product: CheckoutProduct[];
  userId: string;
  shippingAddress?: string;
  addressValue: typeof AddressTable.$inferInsert;
  paymentMethod: PaymentMethod;
  orderEmail: string;
};

export type VerifiedCreateOrderError =
  | "FAILED_TO_CREATE_NEW_ADDRESS"
  | "FAILED_TO_CREATE_ORDER"
  | "FAILED_TO_CREATE_ORDER_ITEM"
  | "FAILED_TO_REMOVE_CART";

export const createOrder = async ({
  totalAmount,
  product,
  userId,
  shippingAddress,
  addressValue,
  paymentMethod,
  orderEmail,
}: TCreateOrder): Promise<
  Response<VerifiedCreateOrderError, { id: string }>
> => {
  let newAddressId = shippingAddress;

  if (!shippingAddress) {
    const [newAddress] = await db
      .insert(AddressTable)
      .values(addressValue)
      .returning({ id: AddressTable.id });

    if (!newAddress)
      return {
        success: false,
        error: "FAILED_TO_CREATE_NEW_ADDRESS",
        message: "Failed To Create Address",
      };

    newAddressId = newAddress.id;
  }

  const [orderTable] = await db
    .insert(OrdersTable)
    .values({
      userId: userId,
      totalAmount: totalAmount,
      paymentMethod,
      firstName: addressValue.firstName,
      lastName: addressValue.lastName,
      email: addressValue.email,
      phone: addressValue.phone,
      region: addressValue.region,
      city: addressValue.city,
      zone: addressValue.zone,
      address: addressValue.address,
      addressType: addressValue.addressType,
    })
    .returning({ id: OrdersTable.id });

  if (!orderTable)
    return {
      success: false,
      error: "FAILED_TO_CREATE_ORDER",
      message: "Failed To Create Order",
    };

  const insertedItems = await Promise.all(
    product.map((item) =>
      db
        .insert(OrderItemTable)
        .values({
          orderId: orderTable.id,
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
          size: item.size,
          orderEmail,
        })
        .returning({
          id: OrderItemTable.id,
          productId: OrderItemTable.productId,
        })
    )
  );

  // Flatten nested arrays
  const orderItems = insertedItems.flat();

  if (!orderItems.length)
    return {
      success: false,
      error: "FAILED_TO_CREATE_ORDER_ITEM",
      message: "Failed To Create Order Item",
    };

  // 🧹 Remove items from cart
  const removedItem = await db
    .delete(CartTable)
    .where(
      and(
        inArray(
          CartTable.id,
          orderItems.map((item) => item.productId)
        ),
        eq(CartTable.userId, userId)
      )
    )
    .returning({ id: CartTable.id });

  if (!removedItem)
    return {
      success: false,
      error: "FAILED_TO_REMOVE_CART",
      message: "Failed To Remove From Cart",
    };

  // Revalidating cache data
  revalidateOrderCache(userId);
  revalidateCartCache(userId);
  revalidateAddressCache(userId);

  // Dec Sanity product stock
  product.forEach(async (item) => {
    const res = await client
      .patch(item._id)
      .dec({ "variants.stock": item.quantity })
      .commit();

    if (!res) console.log("Failed to dec stock");
  });

  return { success: true, message: "Ok", data: { id: orderTable.id } };
};
