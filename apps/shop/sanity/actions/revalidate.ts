import { WebhookPayload } from "@/app/api/webhook/sanity/route";
import { revalidateSanityCache } from "./cache";

export async function revalidate(payload: WebhookPayload) {
  const { _type, slug, _id } = payload;

  try {
    switch (_type) {
      case "product":
        revalidateSanityCache("homeProducts", _id);
        revalidateSanityCache("products", _id);
        break;

      case "category":
        revalidateSanityCache("categorySection", _id);
        break;

      case "banner":
        revalidateSanityCache("heroBanner", _id);
        break;
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    throw error;
  }
}
