import { getUserIdTag } from "@/features/users/db/cache";
import { auth, clerkClient, User } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";

const client = await clerkClient();

export async function syncUserToDatabase(user: User) {
  try {
    // Check if user already exists in DB
    const existingUser = await db.query.UserTable.findFirst({
      where: (users, { eq }) => eq(users.clerkId, user.id),
    });

    if (existingUser) {
      // Update metadata and return
      await client.users.updateUserMetadata(user.id, {
        publicMetadata: {
          role: "user",
          userId: existingUser.id,
        },
      });
      return existingUser;
    }

    // Create new user in database
    const [newUser] = await db
      .insert(UserTable)
      .values({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        username: user.username ?? user.emailAddresses[0].emailAddress,
        picture: user.imageUrl,
      })
      .returning();

    // Update Clerk metadata
    await client.users.updateUserMetadata(user.id, {
      publicMetadata: {
        role: "user",
        userId: newUser.id,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error syncing user to database:", error);
    throw error;
  }
}

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (userId != null && sessionClaims.userId == null) {
    redirect("/auth/sync");
  }

  return {
    clerkUserId: userId,
    userId: sessionClaims?.userId,
    role: sessionClaims?.role,
    user:
      allData && sessionClaims?.userId != null
        ? await getUser(sessionClaims.userId)
        : undefined,
    redirectToSignIn,
  };
}

async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));
  console.log(`Cached User:${id}`);

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
}
