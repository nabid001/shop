import { userAddressTypes } from "@repo/drizzle-config/schemas/address";
import { z } from "zod";

export const AddAddressSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.email().min(1, { message: "Email is required" }),
  phone: z
    .string()
    .min(11, { message: "Phone number is required" })
    .max(11)
    .regex(/^\d+$/, "Input must contain only numbers."),
  region: z.string().min(1, { message: "Region is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zone: z.string().min(1, { message: "Zone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  addressType: z.enum(userAddressTypes),
  landmark: z.string().optional(),
});

export type AddAddressSchemaType = z.infer<typeof AddAddressSchema>;
