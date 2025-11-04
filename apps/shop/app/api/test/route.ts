import { NextRequest, NextResponse } from "next/server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { eq } from "drizzle-orm";

const client = await clerkClient();

export async function POST(request: NextRequest) {
  const { clerkId } = await request.json();
  if (!clerkId) return Response.json({ message: "Missing clerkId" });

  const clerkUser = await currentUser();
  const { isAuthenticated } = await auth();

  if (!clerkUser || !isAuthenticated) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.clerkId, clerkId),
    columns: {
      id: true,
      role: true,
    },
  });

  if (existingUser) {
    return Response.json({ message: "User Already Exist" }, { status: 200 });
  }

  const [newUser] = await db
    .insert(UserTable)
    .values({
      clerkId: clerkUser.id,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`,
      username: clerkUser.username ?? clerkUser.emailAddresses[0].emailAddress,
      email: clerkUser.emailAddresses[0].emailAddress,
      picture: clerkUser.imageUrl,
    })
    .returning({
      id: UserTable.id,
      role: UserTable.role,
    })
    .onConflictDoNothing();

  console.log(newUser);

  if (newUser) {
    await client.users.updateUserMetadata(clerkId, {
      publicMetadata: {
        userId: newUser.id,
        role: newUser.role,
      },
    });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
