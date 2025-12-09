import {
  getOrderGlobalTag,
  getOrderUserTag,
} from "@/features/profile/db/cache/order-cache";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag, updateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json().catch(() => ({ userId: undefined }));

    if (typeof userId === "string" && userId.length > 0) {
      revalidateTag(getOrderUserTag(userId), { expire: 0 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order revalidate failed", error);
    return new NextResponse("Failed to revalidate", { status: 500 });
  }
}
