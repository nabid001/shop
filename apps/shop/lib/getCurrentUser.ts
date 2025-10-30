import { getUserIdTag } from "@/features/users/db/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";
import { cacheTag, refresh } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

// export async function getCurrentUser({ allData = false } = {}) {
//   const authData = await auth();
//   return getCurrentUserCached(authData, allData);
// }

// const getCurrentUserCached = async (
//   authData: Awaited<ReturnType<typeof auth>>,
//   allData: boolean = false
// ) => {
//   const { userId, sessionClaims, redirectToSignIn } = authData;

//   if (userId != null && sessionClaims.metadata == null) {
//     redirect("/sign-in");
//   }

//   return {
//     clerkUserId: userId,
//     userId: sessionClaims?.metadata.userId,
//     role: sessionClaims?.metadata.role,
//     user:
//       allData && sessionClaims?.metadata?.userId != null
//         ? await getUser(sessionClaims.metadata.userId)
//         : undefined,
//     redirectToSignIn,
//   };
// };

// const getUser = cache(async (id: string) => {
//   "use cache";
//   cacheTag(getUserIdTag(id));
//   console.log(`Called from user:${id}`);

//   return db.query.UserTable.findFirst({
//     where: eq(UserTable.id, id),
//     columns: { id: true, email: true, role: true, name: true, picture: true },
//   });
// });

export async function getCurrentUser({ allData = false } = {}) {
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  if (userId != null && sessionClaims.metadata.userId == null) {
    redirectToSignIn();
  }

  return {
    clerkUserId: userId,
    userId: sessionClaims?.metadata?.userId,
    role: sessionClaims?.metadata?.role,
    user:
      allData && sessionClaims?.metadata.userId != null
        ? await getUser(sessionClaims.metadata.userId!)
        : undefined,
    redirectToSignIn,
  };
}

async function getUser(id: string) {
  "use cache";
  cacheTag(getUserIdTag(id));

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
}
