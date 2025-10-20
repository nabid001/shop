import z from "zod";

export const AddToCartSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  color: z.string().min(1, { message: "Select one color" }),
  size: z.string().min(1, { message: "Select one size" }),
  quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
  priceAtAdd: z.number().min(1, { message: "Quantity must be at least 1" }),
});
