import { z } from "zod";

export const productStatus = ["private", "public"] as const;
export const productSizes = ["SM", "M", "L", "XL", "XXL"] as const;
export const productFlags = ["featured", "none"] as const;

export const ProductZodSchema = z.object({
  name: z.string().min(3, "Name is required"),
  slug: z
    .string()
    .min(3, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),
  shortDescription: z.string().min(15, "Short description is required"),
  longDescription: z.string().min(20, "Long description is required"),
  mainImage: z
    .string()
    .min(1, { message: "Image must be at least 1" }) // corrected the typo here
    .url("Main image must be a valid URL"),
  multiImages: z.array(z.string().url("image must be a valid URL")).optional(),
  price: z.coerce.number().min(1, "Price must be at least 1").nonnegative(),
  salePrice: z.coerce
    .number()
    .min(1, "Sale price must be at least 1")
    .nonnegative(),
  stock: z.coerce.number().nonnegative(),
  status: z.enum(productStatus),
  color: z.array(z.string()).optional(),
  size: z.array(z.string()).optional(),
  category: z.array(z.string()),
  flag: z.enum(productFlags),
});

export type ProductZodType = z.infer<typeof ProductZodSchema>;

export const AddressSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  phone: z.coerce.string().min(11, "Phone should be at least 11"),
  region: z.string().min(3, "Region is required"),
  city: z.string().min(3, "City is required"),
  zone: z.string().min(3, "Zone is required"),
  address: z.string().min(5, "Address is required"),
  landmark: z.string().optional(),
  addressType: z.enum(["home", "office"]),
});

export type AddressZodType = z.infer<typeof AddressSchema>;
