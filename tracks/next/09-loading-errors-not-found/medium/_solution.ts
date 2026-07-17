export type ReservationState =
  | { readonly status: "validation-error"; readonly message: string }
  | { readonly status: "conflict"; readonly message: string }
  | { readonly status: "success"; readonly sku: string };

export async function reserveStock(
  rawSku: string,
  reserve: (sku: string) => Promise<boolean>,
): Promise<ReservationState> {
  const sku = rawSku.trim();
  if (!sku) return { status: "validation-error", message: "SKU jest wymagane" };
  if (!(await reserve(sku))) {
    return { status: "conflict", message: "Produkt jest już niedostępny" };
  }
  return { status: "success", sku };
}
