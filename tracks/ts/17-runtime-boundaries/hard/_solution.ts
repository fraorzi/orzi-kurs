declare const orderBrand: unique symbol;
export type OrderId = string & { readonly [orderBrand]: "OrderId" };

export type Order = {
  id: OrderId;
  status: "pending" | "paid" | "cancelled";
  total: number;
  items: readonly { sku: string; quantity: number }[];
};

export type ParseResult<T> =
  | { ok: true; value: T }
  | { ok: false; errors: string[] };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseOrderId(value: unknown): OrderId | null {
  return typeof value === "string" && /^ord_[1-9]\d*$/.test(value)
    ? value as OrderId
    : null;
}

export function parseOrderResponse(input: unknown): ParseResult<Order> {
  if (!isRecord(input)) return { ok: false, errors: ["order"] };

  const errors: string[] = [];
  const id = parseOrderId(input.id);
  if (id === null) errors.push("id");
  const status =
    input.status === "pending" ||
    input.status === "paid" ||
    input.status === "cancelled"
      ? input.status
      : null;
  if (status === null) errors.push("status");
  const total =
    typeof input.total === "number" &&
    Number.isFinite(input.total) &&
    input.total >= 0
      ? input.total
      : null;
  if (total === null) errors.push("total");

  const items: Array<{ sku: string; quantity: number }> = [];
  if (!Array.isArray(input.items)) {
    errors.push("items");
  } else {
    input.items.forEach((item, index) => {
      if (!isRecord(item)) {
        errors.push(`items[${index}]`);
        return;
      }
      const sku =
        typeof item.sku === "string" && item.sku.length > 0
          ? item.sku
          : null;
      const quantity =
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
          ? item.quantity
          : null;
      if (sku === null) errors.push(`items[${index}].sku`);
      if (quantity === null) errors.push(`items[${index}].quantity`);
      if (sku !== null && quantity !== null) {
        items.push({ sku, quantity });
      }
    });
  }

  if (errors.length > 0) return { ok: false, errors };
  if (id === null || status === null || total === null) {
    throw new Error("unreachable");
  }
  return { ok: true, value: { id, status, total, items } };
}
