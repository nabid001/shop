import { WebhookPayload } from "@/app/api/webhook/sanity/route";
import { revalidateTags } from "../../lib/cache";

export async function revalidate(payload: WebhookPayload) {
  const { _type, slug, _id } = payload;

  try {
    switch (_type) {
      case "product":
        revalidateTags("homeProducts", _id);
        break;

      case "category":
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
