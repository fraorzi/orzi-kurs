import { cacheLife, cacheTag } from "next/cache";
import { readProduct } from "./product-store";

export async function getProduct(tenantId: string, slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag(
    "products",
    `tenant:${tenantId}:products`,
    `tenant:${tenantId}:product:${slug}`,
  );
  return readProduct(tenantId, slug);
}
