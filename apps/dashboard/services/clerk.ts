import { cache } from "react";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config/db";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { cacheTag } from "next/cache";

export const isAdmin = cache(async () => {
  const { sessionClaims, userId } = await auth();

  const dbUser = await getUserRole(userId!);

  if (dbUser?.role !== "admin" && sessionClaims?.role !== "admin") {
    return { success: false };
  }

  return { success: true };
});

const getUserRole = async (id: string) => {
  "use cache";
  cacheTag("user");
  return db.query.UserTable.findFirst({
    where: and(eq(UserTable.clerkId, id)),
    columns: {
      role: true,
    },
  });
};
