import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.SANITY_STUDIO_WEBHOOK_SECRET!) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const body = await req.json();
    const docType = body?._type;
    const slug = body?.slug?.current;
    const isDeleted = body?._deleted;

    if (!docType) {
      return NextResponse.json(
        { message: "Missing document type" },
        { status: 400 }
      );
    }

    console.log(body);

    // 🧩 Handle based on type
    switch (docType) {
      case "product":
        if (!isDeleted && slug) {
          //   revalidatePath(`/products/${slug}`);
          console.log("Product webhook triggered");
        }
        // revalidatePath("/products");
        break;

      case "banner":
        if (!isDeleted && slug) {
          //   revalidatePath(`/blog/${slug}`);
          console.log("Banner webhook triggered");
        }
        // revalidatePath("/blog");
        break;

      default:
        console.log(`Unhandled Sanity type: ${docType}`);
        break;
    }

    return NextResponse.json({
      message: "Revalidation triggered",
      type: docType,
      slug: slug || null,
      deleted: isDeleted || false,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { message: "Error processing webhook" },
      { status: 500 }
    );
  }
}
