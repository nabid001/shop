import { revalidateUserCache } from "@/features/users/db/cache";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const client = await clerkClient();

export const syncUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) redirect("/sign-in");

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkId, clerkUser.id),
    columns: { id: true, role: true },
  });

  if (existingUser) return existingUser;

  const [user] = await db
    .insert(UserTable)
    .values({
      clerkId: clerkUser.id!,
      name: clerkUser.fullName!,
      email: clerkUser.emailAddresses[0].emailAddress!,
      username: clerkUser.username!,
      picture: clerkUser.imageUrl!,
      role: "user",
    })
    .returning({ id: UserTable.id, role: UserTable.role });

  if (!user) throw new Error("Failed to create user");

  // Update clerk public metadata
  await client.users.updateUserMetadata(clerkUser.id, {
    publicMetadata: {
      userId: user.id,
      role: user.role,
    },
  });

  // Revalidate cache
  revalidateUserCache(user.id);

  return user;
};
