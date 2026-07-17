import { cacheLife, cacheTag } from "next/cache";
import { loadCatalog } from "./catalog-store";

export async function getCatalog(tenantId: string) {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog", `tenant:${tenantId}:catalog`);
  return loadCatalog(tenantId);
}
