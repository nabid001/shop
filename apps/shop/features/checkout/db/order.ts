"use server";

import { CheckoutProduct } from "@/features/checkout/store";
import { Response } from "@/types";
import { db } from "@repo/drizzle-config";
import {
  AddressTable,
  UserAddressType,
} from "@repo/drizzle-config/schemas/address";
import {
  OrderItemTable,
  OrdersTable,
  PaymentMethod,
} from "@repo/drizzle-config/schemas/order";

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
  | "FAILED_TO_CREATE_ORDER_ITEM";

export const createOrder = async ({
  totalAmount,
  product,
  userId,
  shippingAddress,
  addressValue,
  paymentMethod,
  orderEmail,
}: TCreateOrder): Promise<Response<VerifiedCreateOrderError>> => {
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
      shippingAddress: newAddressId!,
      totalAmount: totalAmount,
    })
    .returning();

  if (!orderTable)
    return {
      success: false,
      error: "FAILED_TO_CREATE_ORDER",
      message: "Failed To Create Order",
    };

  const [orderItems] = await Promise.all(
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
          paymentMethod,
          orderEmail,
        })
        .returning({ id: OrderItemTable.id })
    )
  );

  if (!orderItems.length)
    return {
      success: false,
      error: "FAILED_TO_CREATE_ORDER_ITEM",
      message: "Failed To Create Order Item",
    };

  return { success: true, message: "Ok" };
};
