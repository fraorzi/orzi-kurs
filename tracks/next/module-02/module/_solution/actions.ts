"use server";

import { updateTag } from "next/cache";
import { findMembership, findProduct, getUserId, setStock } from "./inventory-store";

export type StockState = { readonly status: "idle" | "error" | "success"; readonly message?: string };

export async function updateStock(_previous: StockState, formData: FormData): Promise<StockState> {
  const userId = await getUserId();
  const productId = formData.get("productId");
  const stockValue = formData.get("stock");
  const stock = typeof stockValue === "string" ? Number(stockValue) : Number.NaN;
  if (!userId) return { status: "error", message: "Brak dostępu." };
  if (
    typeof productId !== "string" || !productId ||
    !Number.isInteger(stock) || stock < 0 || stock > 10_000
  ) return { status: "error", message: "Niepoprawne dane." };
  const product = await findProduct(productId);
  if (!product) return { status: "error", message: "Produkt niedostępny." };
  const membership = await findMembership(product.tenantId, userId);
  if (!membership || membership.role === "viewer") {
    return { status: "error", message: "Produkt niedostępny." };
  }
  await setStock(productId, stock);
  updateTag(`product:${productId}`);
  updateTag(`tenant:${product.tenantId}:catalog`);
  return { status: "success" };
}
