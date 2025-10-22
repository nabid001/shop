import { NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidate } from "@/sanity/actions/revalidate";

export type WebhookPayload = {
  _type: string;
  _id: string;
  slug?: { current: string };
  operation: "create" | "update" | "delete";
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_STUDIO_WEBHOOK_SECRET;

    if (!secret) {
      console.error(
        "Missing environment variable: SANITY_STUDIO_WEBHOOK_SECRET"
      );
      return new Response(
        "Missing environment variable SANITY_STUDIO_WEBHOOK_SECRET",
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret
    );

    if (!isValidSignature) {
      console.error("Invalid signature received");
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?._type) {
      console.error("Missing _type in body:", body);
      const message = "Bad Request - Missing _type";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    console.log("Webhook received:", {
      type: body._type,
      id: body._id,
      operation: body.operation,
    });

    // Add actual revalidation logic
    await revalidate(body);

    console.log("Successfully revalidated for:", body._type);
    return new Response(
      JSON.stringify({
        message: "Successfully revalidated",
        revalidated: true,
        type: body._type,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
