import z from "zod";

export const AddToCartSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  color: z.string().min(1, { message: "Select one color" }),
  size: z.string().min(1, { message: "Select one size" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  priceAtAdd: z.number().min(1, { message: "Quantity must be at least 1" }),
});

export const GetProductsSchema = z.object({
  search: z.string().optional(),
  sorting: z.string().optional(),
  category: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return [];
      return Array.isArray(val) ? val : [val];
    }),
});
