"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { UserTable } from "../schema";
import { unstable_cacheTag as cacheTag } from "next/cache";

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

    return deletedUser;
  } catch (error) {
    console.log(error);
  }
};

export const getUserRole = async (clerkId: string) => {
  try {
    if (!clerkId) {
      return {
        success: false,
        message: "Clerk id is required!",
        status: 404,
      };
    }

    const [user] = await db
      .select({ role: UserTable.role, id: UserTable.id })
      .from(UserTable)
      .where(eq(UserTable.clerkId, clerkId));

    cacheTag(`user-id:${user.id}`);
    return {
      success: true,
      message: "Success",
      status: 200,
      id: user.id,
      role: user.role,
    };
  } catch (error) {
    console.log(
      "Failed to get user role. something might have done wrong",
      error
    );
    throw new Error("Failed to get user role. something might have done wrong");
  }
};
