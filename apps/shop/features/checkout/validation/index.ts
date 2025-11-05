import { userAddressTypes } from "@repo/drizzle-config/schemas/address";
import { pE } from "@repo/drizzle-config/schemas/order";
import z from "zod";

export const CheckoutSchema = z.object({
  shippingAddress: z.string(),
  paymentMethod: z.enum(["cod", "bkash", "sslcommerz"]).default("cod"),
});

export const CheckoutFormSchema = z.object({
  // address form
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  phoneNumber: z
    .string()
    .min(11, { message: "Phone number is required" })
    .max(11)
    .regex(/^\d+$/, "Input must contain only numbers."),
  region: z.string().min(1, { message: "Region is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zone: z.string().min(1, { message: "Zone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  addressType: z.enum(userAddressTypes),

  //
  shippingAddressId: z.string().optional(),
  paymentMethod: z.enum(pE),
});
