"use server";

import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { revalidateUserCache } from "./cache";

// export const name = async () => {
//   try {

//   } catch (error) {
//     console.log(error);
//   }
// }
export const getUserByClerkId = async (clerkId: string) => {
  try {
    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.clerkId, clerkId!),
      columns: {
        id: true,
        clerkId: true,
        email: true,
      },
    });
    if (user === null) {
      console.log("User not found");
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user");
  }
};

export const createUser = async ({
  clerkId,
  name,
  username,
  picture,
  email,
}: typeof UserTable.$inferInsert) => {
  try {
    const [newUser] = await db
      .insert(UserTable)
      .values({
        clerkId,
        email,
        name,
        username,
        picture,
      })
      .returning();

    if (newUser === null) {
      console.log("Failed to create user");
      throw new Error("Failed to create user");
    }

    revalidateUserCache(newUser.id);
    return newUser;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async ({
  clerkId,
  name,
  username,
  picture,
}: Partial<typeof UserTable.$inferInsert>) => {
  try {
    const [updatedUser] = await db
      .update(UserTable)
      .set({ name, username, picture })
      .where(eq(UserTable.clerkId, clerkId!))
      .returning();

    if (updatedUser === null) throw new Error("Failed to update user");

    revalidateUserCache(updatedUser.id);

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (clerkId: string) => {
  try {
    const [deletedUser] = await db
      .delete(UserTable)
      .where(eq(UserTable.clerkId, clerkId))
      .returning();

    if (deletedUser === null) throw new Error("Failed to update user");

    revalidateUserCache(deletedUser.id);
    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};
