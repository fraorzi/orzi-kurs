"use server";

import { revalidateTag } from "next/cache";
import { persistProductName } from "./product-store";

export async function renameProduct(
  tenantId: string,
  productId: string,
  name: string,
) {
  const product = await persistProductName(tenantId, productId, name.trim());
  revalidateTag(`tenant:${tenantId}:products`, "max");
  revalidateTag(`tenant:${tenantId}:product:${productId}`, "max");
  return product;
}
