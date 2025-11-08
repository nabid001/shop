import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { db } from "@repo/drizzle-config";
import { cacheTag } from "next/cache";
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getCurrentUser = cache(async ({ allData = false } = {}) => {
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
        ? await getUser(sessionClaims.userId!)
        : undefined,
    redirectToSignIn,
  };
});

const getUser = async (id: string) => {
  "use cache";
  // cacheTag(getUserIdTag(id));
  cacheTag("user");

  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
    columns: {
      id: true,
      clerkId: true,
      email: true,
      role: true,
      name: true,
      picture: true,
    },
  });
};
