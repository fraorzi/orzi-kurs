"use server";

import { updateTag } from "next/cache";
import {
  findMembership,
  findProduct,
  getUserId,
  setStock,
} from "./inventory-store";

export type StockState = {
  readonly status: "idle" | "error" | "success";
  readonly message?: string;
};

export async function updateStock(
  _previous: StockState,
  formData: FormData,
): Promise<StockState> {
  const userId = await getUserId();
  const productId = String(formData.get("productId") ?? "");
  const tenantId = String(formData.get("tenantId") ?? "");
  const stock = Number(formData.get("stock"));
  if (!userId)
    return { status: "error", message: "Brak dostępu." };
  await findProduct(productId);
  await findMembership(tenantId, userId);
  await setStock(productId, stock);
  updateTag("catalog");
  return { status: "success" };
}
