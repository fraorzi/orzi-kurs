"use server";

import { updateTag } from "next/cache";
import { persistProductName } from "./product-store";

export async function renameProduct(
  tenantId: string,
  productId: string,
  name: string,
) {
  const product = await persistProductName(tenantId, productId, name.trim());
  updateTag(`tenant:${tenantId}:products`);
  updateTag(`tenant:${tenantId}:product:${productId}`);
  return product;
}
