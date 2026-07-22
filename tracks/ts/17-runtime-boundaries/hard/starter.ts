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

export function parseOrderResponse(input: unknown): ParseResult<Order> {
  // TODO
  return { ok: false, errors: [] };
}
