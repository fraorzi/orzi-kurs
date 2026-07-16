declare const orderIdBrand: unique symbol;

export type Result<T, E> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };

export type ParseResult<T> = Result<T, readonly string[]>;
export type Parser<T> = (input: unknown) => ParseResult<T>;

export type OrderId = string & {
  readonly [orderIdBrand]: "OrderId";
};

export const ORDER_STATUSES = ["pending", "paid", "cancelled"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  readonly sku: string;
  readonly quantity: number;
}

export interface Order {
  readonly id: OrderId;
  readonly status: OrderStatus;
  readonly total: number;
  readonly items: readonly OrderItem[];
}

export type ApiError =
  | {
      readonly kind: "aborted";
      readonly reason: "external" | "timeout";
    }
  | { readonly kind: "http"; readonly status: number }
  | {
      readonly kind: "invalid-response";
      readonly errors: readonly string[];
    }
  | { readonly kind: "network"; readonly message: string };

export type FetchLike = (
  url: string,
  init: Readonly<{ signal: AbortSignal }>,
) => Promise<Response>;

export interface RequestOptions {
  readonly signal?: AbortSignal;
}

export interface OrderClientOptions {
  readonly baseUrl: string;
  readonly fetchImpl: FetchLike;
  readonly concurrency?: number;
  readonly retries?: number;
  readonly backoffMs?: number;
  readonly timeoutMs?: number;
  readonly sleep?: (ms: number) => Promise<void>;
}

export interface OrderClient {
  getOrder(
    id: OrderId,
    options?: RequestOptions,
  ): Promise<Result<Order, ApiError>>;
  listOrders(
    options?: RequestOptions,
  ): Promise<Result<readonly Order[], ApiError>>;
  readonly active: number;
  readonly pending: number;
}
