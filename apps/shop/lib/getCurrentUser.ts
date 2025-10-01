import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function getCurrentUser({ allData = false } = {}) {
  const authData = await auth();
  return getCurrentUserCached(authData, allData);
}

const getCurrentUserCached = cache(
  async (
    authData: Awaited<ReturnType<typeof auth>>,
    allData: boolean = false
  ) => {
    "use cache";
    const { userId, sessionClaims, redirectToSignIn } = authData;
    cacheTag(`user-${userId}`);

    if (userId != null && sessionClaims.metadata == null) {
      redirect("/sign-in");
    }

    return {
      clerkUserId: userId,
      userId: sessionClaims?.metadata.userId,
      role: sessionClaims?.metadata.role,
      user:
        allData && sessionClaims?.metadata?.userId != null
          ? await getUser(sessionClaims.metadata.userId)
          : undefined,
      redirectToSignIn,
    };
  }
);

const getUser = cache(async (id: string) => {
  return db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });
});
