"use server";

import { db } from "../../db";

export const getCategories = async () => {
  try {
    const data = await db.query.CategoryTable.findMany();

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};
