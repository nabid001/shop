import { WebhookPayload } from "@/app/api/webhook/sanity/route";
import { revalidateTags } from "../../lib/cache";
import { revalidateCategoryCache } from "@/features/products/db/cache/category";
import { revalidateProductCache } from "@/features/products/db/cache/product";

export async function revalidate(payload: WebhookPayload) {
  const { _type, slug, _id } = payload;

  try {
    switch (_type) {
      case "product":
        // revalidateTags("homeProducts", _id);
        // revalidateProductCache();
        break;

      case "category":
        // revalidateTags("categorySection", _id);
        // revalidateCategoryCache(_id);
        break;
      case "banner":
        // revalidateTags("heroBanner", _id);
        break;
    }
  } catch (error) {
    console.error("Revalidation error:", error);
    throw error;
  }
}
