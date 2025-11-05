import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateUser } from "@/features/users/db/user";

const client = await clerkClient();

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET!;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const {
      id,
      username,
      first_name,
      last_name,
      image_url,
      email_addresses,
      public_metadata,
    } = evt.data;

    const email = email_addresses[0].email_address;
    const name = `${first_name} ${last_name}`;
    if (email == null) return new Response("No email", { status: 400 });
    if (name === "") return new Response("No name", { status: 400 });
    const dbId = public_metadata.userId;

    const user = await createUser({
      clerkId: id,
      email,
      name,
      picture: image_url,
      username: username!,
      role: "user",
    });

    if (user != null && dbId === null) {
      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: user.id,
          role: user.role,
        },
      });
    }
  } else if (eventType === "user.updated") {
    const { id, username, first_name, last_name, image_url } = evt.data;

    await updateUser({
      clerkId: id,
      username: username!,
      name: `${first_name} ${last_name}`,
      picture: image_url,
      role: evt.data.public_metadata.role,
    });
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;
    if (!id) {
      throw new Error("user id not provided");
    }
    await deleteUser(id);
  }

  return new Response("Webhook received", { status: 200 });
}
