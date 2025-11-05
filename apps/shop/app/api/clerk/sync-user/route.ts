import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { db } from "@repo/drizzle-config";
import { UserTable } from "@repo/drizzle-config/schemas/user";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already synced
    if (user.publicMetadata?.dbSynced === true) {
      return NextResponse.json({ message: "Already synced" });
    }

    // Check if user exists in database
    const existingUser = await db.query.UserTable.findFirst({
      where: (users, { eq }) => eq(users.clerkId, userId),
    });

    if (existingUser)
      return NextResponse.json({ success: true, message: "Already synced" });

    // Create user in database
    const [newUser] = await db
      .insert(UserTable)
      .values({
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
        username: user.username ?? user.emailAddresses[0].emailAddress,
        picture: user.imageUrl,
      })
      .returning({ id: UserTable.id, role: UserTable.role })
      .onConflictDoNothing();

    if (!newUser) {
      return NextResponse.json(
        { error: "Failed to sync user" },
        { status: 500 }
      );
    }

    // Update Clerk metadata
    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        userId: newUser.id,
        role: newUser.role,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
