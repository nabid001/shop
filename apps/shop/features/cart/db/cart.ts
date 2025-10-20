// "use server";

import { db } from "@repo/drizzle-config";
import { CartTable } from "@repo/drizzle-config/schemas/cart";
import { getCartUserIdTag } from "./cache";
import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

// import { revalidatePath } from "next/cache";
// import z from "zod";

// const t = z.object({
//   colors: z.array(z.string()).min(1, { message: "Select one color" }),
//   sizes: z.array(z.string()).min(1, { message: "Select one size" }),
// });

// export const addToCart = async (
//   userId: string,
//   productId: string,
//   colors: string[],
//   sizes: string[],
//   quantity: number
// ) => {
//   const parsedData = await t.safeParseAsync({ colors, sizes });

//   if (!userId) {
//     throw new Error("User ID is required");
//   } else if (!productId) {
//     throw new Error("Product ID is required");
//   } else if (parsedData.error) {
//     throw new Error(parsedData.error.message);
//   }

//   const isAlreadyInCart = await db.query.CartTable.findFirst({
//     where: and(
//       eq(CartTable.userId, userId),
//       eq(CartTable.productId, productId)
//     ),
//   });

//   if (isAlreadyInCart) {
//     return {
//       success: false,
//       message: "Product is already in the cart",
//     };
//   }

//   try {
//     const res = await db
//       .insert(CartTable)
//       .values({
//         productId,
//         userId,
//         colors: colors,
//         sizes: sizes,
//         quantity,
//       })
//       .returning();

//     revalidatePath("/cart");
//     return {
//       success: true,
//       message: "Product added to cart",
//       data: res,
//     };
//   } catch (error) {
//     console.log("Failed to add to cart", error);
//     throw new Error("Failed to add to cart");
//   }
// };

// export const getCartItems = async (userId: string) => {
//   try {
//     if (!userId) {
//       throw new Error("User ID is required");
//     }

//     const res = await db.query.CartTable.findMany({
//       where: and(eq(CartTable.userId, userId)),
//       with: {
//         productId: {
//           columns: {
//             id: true,
//             name: true,
//             author: true,
//             price: true,
//             stock: true,
//             mainImage: true,
//             salePrice: true,
//           },
//         },
//       },
//     });
//     return res;
//   } catch (error) {
//     console.log("Failed to get cart items", error);
//     throw new Error("Failed to get cart items");
//   }
// };

// export const removeFromCart = async ({
//   userId,
//   productId,
// }: {
//   userId: string;
//   productId: string;
// }) => {
//   try {
//     if (!userId) {
//       throw new Error("User ID is required");
//     } else if (!productId) {
//       throw new Error("Product ID is required");
//     }

//     const res = await db
//       .delete(CartTable)
//       .where(
//         and(eq(CartTable.userId, userId), eq(CartTable.productId, productId))
//       )
//       .returning();

//     revalidatePath("/");
//     return { res, success: true };
//   } catch (error) {
//     console.log("Failed to remove from cart", error);
//     throw new Error("Failed to remove from cart");
//   }
// };

export const getCartLength = async ({
  userId,
}: {
  userId: string;
}): Promise<number> => {
  "use cache";
  cacheTag(getCartUserIdTag({ id: userId }));

  const items = await db.query.CartTable.findMany({
    columns: {
      id: true,
    },
    where: eq(CartTable.userId, userId),
  });

  return items.length;
};
