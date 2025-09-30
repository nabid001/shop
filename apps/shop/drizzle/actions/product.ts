"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { ProductCategoryTable, ProductTable } from "../schema";
import { ProductDataProps } from "@/types";

export const createProduct = async (data: ProductDataProps) => {
  try {
    const [product] = await db.insert(ProductTable).values(data).returning();

    if (product === null) {
      throw new Error("Product creation failed");
    }

    const categories = await db.query.CategoryTable.findMany({
      where: (category, { sql }) =>
        sql`${category.categoryName} IN ${data.category}`,
    });

    await db.insert(ProductCategoryTable).values(
      categories.map((category) => ({
        categoryId: category.id,
        productId: product.id,
      }))
    );
    return product;
  } catch (error) {
    console.log("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (data: Partial<ProductDataProps>) => {
  try {
    if (!data.id) {
      throw new Error("Product ID is required to update.");
    }

    // ✅ Update product table
    const [product] = await db
      .update(ProductTable)
      .set(data)
      .where(eq(ProductTable.id, data.id))
      .returning();

    if (!product) {
      throw new Error("Product update failed");
    }

    // ✅ If category data is provided
    if (data.category && Array.isArray(data.category)) {
      // 1. Get matching category rows from DB by name
      const categories = await db.query.CategoryTable.findMany({
        where: (category, { inArray }) =>
          inArray(category.name, data.category as string[]),
      });

      // 2. Clear old categories for this product
      await db
        .delete(ProductCategoryTable)
        .where(eq(ProductCategoryTable.productId, product.id));

      // 3. Insert new categories
      if (categories.length > 0) {
        await db.insert(ProductCategoryTable).values(
          categories.map((category) => ({
            categoryId: category.id,
            productId: product.id,
          }))
        );
      }
    }

    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const getProductById = async (id: string) => {
  try {
    if (!id) {
      return {
        success: false,
        message: "Product id is required",
        errorType: "id-require",
      };
    }

    const data = await db.query.ProductTable.findFirst({
      where: and(eq(ProductTable.id, id), eq(ProductTable.status, "public")),
      columns: {
        id: true,
        name: true,
        price: true,
        mainImage: true,
        multiImages: true,
        longDescription: true,
        shortDescription: true,
        color: true,
        size: true,
        stock: true,
      },
    });

    if (!data) {
      return {
        success: false,
        message: "Couldn't found product!",
        errorType: "product-deleted",
      };
    }

    return {
      data,
      message: true,
      errorType: "none",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      errorType: "server-error",
      message: "Invalid Product Id",
    };
  }
};
export const getProducts = async () => {
  try {
    const data = await db.query.ProductTable.findMany({
      orderBy: (product, { desc }) => [desc(product.createdAt)],
      columns: {
        id: true,
        name: true,
        price: true,
        mainImage: true,
      },
      where: eq(ProductTable.status, "public"),
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch the product");
  }
};
