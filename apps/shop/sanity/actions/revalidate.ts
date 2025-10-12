import {
  revalidateBannerCache,
  revalidateCategoryCache,
  revalidateProductCache,
} from "./cache";
import { WebhookPayload } from "@/app/api/webhook/sanity/route";

export async function revalidate(payload: WebhookPayload) {
  const { _type, _id } = payload;

  try {
    switch (_type) {
      case "product":
        revalidateProductCache(_id);
        break;

      case "category":
        revalidateCategoryCache(_id);
        break;
      case "banner":
        revalidateBannerCache(_id);
        break;
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    throw error;
  }
}
