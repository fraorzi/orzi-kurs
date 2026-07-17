import { cacheTag } from "next/cache";
import { readProduct } from "./product-store";

export async function getProduct(tenantId: string, slug: string) {
  "use cache";
  cacheTag("products");
  return readProduct(tenantId, slug);
}
