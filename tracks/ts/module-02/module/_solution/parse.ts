import {
  ORDER_STATUSES,
  type Order,
  type OrderId,
  type OrderItem,
  type OrderStatus,
  type ParseResult,
} from "./types";

const ORDER_ID_RE = /^ord_[a-z0-9]{6}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isOrderStatus(value: unknown): value is OrderStatus {
  const statuses: readonly string[] = ORDER_STATUSES;
  return typeof value === "string" && statuses.includes(value);
}

function parseOrderItems(input: unknown): ParseResult<readonly OrderItem[]> {
  if (!Array.isArray(input)) {
    return { ok: false, error: ["items musi być tablicą"] };
  }

  const items: OrderItem[] = [];
  const errors: string[] = [];

  for (const [index, item] of input.entries()) {
    if (!isRecord(item)) {
      errors.push(`items[${index}] nie jest obiektem`);
      continue;
    }

    const { sku, quantity } = item;
    const validSku = typeof sku === "string" && sku.trim().length > 0;
    const validQuantity =
      typeof quantity === "number" &&
      Number.isInteger(quantity) &&
      quantity > 0;

    if (!validSku) {
      errors.push(`items[${index}].sku musi być niepustym tekstem`);
    }
    if (!validQuantity) {
      errors.push(`items[${index}].quantity musi być dodatnią liczbą całkowitą`);
    }
    if (validSku && validQuantity) {
      items.push({ sku, quantity });
    }
  }

  return errors.length > 0
    ? { ok: false, error: errors }
    : { ok: true, value: items };
}

export function parseOrderId(input: unknown): ParseResult<OrderId> {
  return typeof input === "string" && ORDER_ID_RE.test(input)
    ? { ok: true, value: input as OrderId }
    : { ok: false, error: ["id ma format ord_xxxxxx"] };
}

export function parseOrder(input: unknown): ParseResult<Order> {
  if (!isRecord(input)) {
    return { ok: false, error: ["order nie jest obiektem"] };
  }

  const { id, status, total, items } = input;
  const parsedId = parseOrderId(id);
  const validStatus = isOrderStatus(status);
  const validTotal =
    typeof total === "number" && Number.isFinite(total) && total >= 0;
  const parsedItems = parseOrderItems(items);
  const errors: string[] = [];

  if (!parsedId.ok) errors.push(...parsedId.error);
  if (!validStatus) {
    errors.push("status musi być jednym z: pending, paid, cancelled");
  }
  if (!validTotal) {
    errors.push("total musi być skończoną liczbą >= 0");
  }
  if (!parsedItems.ok) errors.push(...parsedItems.error);

  if (
    errors.length > 0 ||
    !parsedId.ok ||
    !validStatus ||
    !validTotal ||
    !parsedItems.ok
  ) {
    return { ok: false, error: errors };
  }

  return {
    ok: true,
    value: {
      id: parsedId.value,
      status,
      total,
      items: parsedItems.value,
    },
  };
}

export function parseOrderList(
  input: unknown,
): ParseResult<readonly Order[]> {
  if (!Array.isArray(input)) {
    return { ok: false, error: ["orders musi być tablicą"] };
  }

  const orders: Order[] = [];
  const errors: string[] = [];

  for (const [index, value] of input.entries()) {
    const parsed = parseOrder(value);
    if (parsed.ok) {
      orders.push(parsed.value);
    } else {
      errors.push(...parsed.error.map((error) => `[${index}].${error}`));
    }
  }

  return errors.length > 0
    ? { ok: false, error: errors }
    : { ok: true, value: orders };
}
