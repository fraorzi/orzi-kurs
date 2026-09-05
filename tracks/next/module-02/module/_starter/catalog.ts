import { cacheTag } from "next/cache";
import { loadCatalog } from "./catalog-store";

export async function getCatalog(tenantId: string) {
  "use cache";
  cacheTag("catalog");
  return loadCatalog(tenantId);
}
