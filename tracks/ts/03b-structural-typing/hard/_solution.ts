export type Order = {
  id: string;
  items: readonly { sku: string; quantity: number }[];
};

export type AuditEvent =
  | { type: "fulfilled"; orderId: string }
  | { type: "rejected"; orderId: string; sku: string };

export interface StockPort {
  reserve(sku: string, quantity: number): boolean;
}

export interface AuditPort {
  record(event: AuditEvent): void;
}

export type FulfillmentResult =
  | { ok: true; reserved: number }
  | { ok: false; failedSku: string };

export function fulfillOrder(
  order: Order,
  stock: StockPort,
  audit: AuditPort,
): FulfillmentResult {
  if (order.items.length === 0) {
    throw new RangeError("order.items");
  }

  let reserved = 0;
  for (const item of order.items) {
    if (!stock.reserve(item.sku, item.quantity)) {
      audit.record({ type: "rejected", orderId: order.id, sku: item.sku });
      return { ok: false, failedSku: item.sku };
    }
    reserved += item.quantity;
  }

  audit.record({ type: "fulfilled", orderId: order.id });
  return { ok: true, reserved };
}
