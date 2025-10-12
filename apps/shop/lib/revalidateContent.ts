import { WebhookPayload } from "@/app/api/webhook/sanity/route";
import { revalidatePath } from "next/cache";
import { revalidateTags } from "./cache";

export async function revalidateContent(payload: WebhookPayload) {
  const { _type, slug, _id } = payload;

  try {
    switch (_type) {
      case "product":
        if (slug?.current) {
          revalidatePath(`/products/${slug.current}`);
        }
        revalidatePath("/products");
        revalidateTags("homeProducts", _id);
        break;

      case "category":
        revalidatePath("/categories");
        revalidateTags("categorySection", _id);
        break;
      case "banner":
        revalidateTags("heroBanner", _id);
        break;
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    throw error;
  }
}
