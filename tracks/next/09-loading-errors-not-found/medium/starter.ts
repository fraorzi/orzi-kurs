export type ReservationState =
  | { readonly status: "validation-error"; readonly message: string }
  | { readonly status: "conflict"; readonly message: string }
  | { readonly status: "success"; readonly sku: string };

export async function reserveStock(
  rawSku: string,
  reserve: (sku: string) => Promise<boolean>,
): Promise<ReservationState> {
  const sku = rawSku.trim();
  if (!sku) throw new Error("SKU jest wymagane");
  if (!(await reserve(sku))) throw new Error("Produkt jest już niedostępny");
  return { status: "success", sku };
}
