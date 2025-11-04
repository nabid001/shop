import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { db } from "@repo/drizzle-config";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const client = await clerkClient();

export const getCurrentUser = async ({ allData = false } = {}) => {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (userId != null && sessionClaims?.userId === null) {
    return null;
  }

  return {
    clerkUserId: userId,
    userId: sessionClaims?.userId,
    role: sessionClaims?.role,
    user:
      allData && sessionClaims?.userId != null
        ? await getUser(sessionClaims.userId!)
        : undefined,
    redirectToSignIn,
  };
};

const getUser = async (id: string) => {
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
    columns: {
      id: true,
      email: true,
      role: true,
      name: true,
      picture: true,
    },
  });
};

export function syncClerkUserMetadata(user: {
  id: string;
  clerkId: string;
  role: "user" | "admin";
}) {
  return client.users.updateUserMetadata(user.clerkId, {
    publicMetadata: {
      dbId: user.id,
      role: user.role,
    },
  });
}

export async function insertUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .returning()
    .onConflictDoUpdate({
      target: [UserTable.clerkId],
      set: data,
    });

  if (newUser == null) throw new Error("Failed to create user");
  // revalidateUserCache(newUser.id)

  return newUser;
}
