"use server";

import { db } from "@/drizzle/db";
import { ProductTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getProducts = async () => {
  const data = await db.query.ProductTable.findMany({
    with: {
      author: {
        columns: { id: true, clerkId: true },
      },
    },
    columns: {
      id: true,
      name: true,
      status: true,
      price: true,
      stock: true,
      totalOrdered: true,
    },
    orderBy: (product, { desc }) => [desc(product.createdAt)],
  });

  return data;
};

export const getProductForEdit = async (id: string) => {
  const data = await db.query.ProductTable.findFirst({
    where: eq(ProductTable.id, id),
    with: {
      productCategories: {
        with: {
          category: {
            columns: {
              id: true,
              categoryName: true,
            },
          },
        },
      },
      author: {
        columns: {
          id: true,
          clerkId: true,
        },
      },
    },
  });

  return data;
};
