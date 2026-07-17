import type {
  Order,
  OrderId,
  ParseResult,
} from "./types";

export function parseOrderId(_input: unknown): ParseResult<OrderId> {
  return { ok: false, error: ["TODO: sprawdź format OrderId"] };
}

export function parseOrder(_input: unknown): ParseResult<Order> {
  return { ok: false, error: ["TODO: sparsuj Order"] };
}

export function parseOrderList(_input: unknown): ParseResult<readonly Order[]> {
  return { ok: false, error: ["TODO: sparsuj listę Order"] };
}
