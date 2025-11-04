import { getUserIdTag } from "@/features/users/db/cache";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/cache";
import { redirect } from "next/navigation";

const client = await clerkClient();

export const getOrCreate = async ({ allData = false } = {}) => {
  const { userId, isAuthenticated } = await auth();
  const clerkUser = await currentUser();

  if (!isAuthenticated) return null;

  if (!clerkUser || !userId) redirect("/sign-in");

  try {
    const exiUser = await existingUser(clerkUser.id);

    if (exiUser) {
      return {
        clerkId: exiUser.clerkId,
        id: exiUser.id,
        name: exiUser.name,
        username: exiUser.username,
        email: exiUser.email,
        picture: exiUser.picture,
        role: exiUser.role,
      };
    }

    const [newUser] = await db
      .insert(UserTable)
      .values({
        clerkId: clerkUser.id,
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`,
        username:
          clerkUser.username ?? clerkUser.emailAddresses[0].emailAddress,
        email: clerkUser.emailAddresses[0].emailAddress,
        picture: clerkUser.imageUrl,
      })
      .returning()
      .onConflictDoNothing();

    if (newUser) {
      await client.users.updateUserMetadata(userId, {
        publicMetadata: {
          userId: newUser.id,
          role: newUser.role,
        },
      });
    }

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create user");
  }
};

const existingUser = async (clerkId: string) => {
  "use cache";
  cacheTag(getUserIdTag(clerkId));
  console.log(`Existing CacheUser:${clerkId}`);

  return db.query.UserTable.findFirst({
    where: eq(UserTable.clerkId, clerkId),
  });
};
