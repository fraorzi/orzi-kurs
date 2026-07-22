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
  // TODO
  return { ok: true, reserved: 0 };
}
