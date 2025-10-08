import { NextRequest, NextResponse } from "next/server";
// import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
};
export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_STUDIO_WEBHOOK_SECRET) {
      return new Response(
        "Missing environment variable SANITY_REVALIDATE_SECRET",
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_STUDIO_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    } else if (!body?._type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    console.log("Success revalidate");
    return new Response("Success revalidate", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
