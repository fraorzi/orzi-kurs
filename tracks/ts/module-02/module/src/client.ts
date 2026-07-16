import type {
  ApiError,
  Order,
  OrderClient,
  OrderClientOptions,
  Result,
} from "./types";

export function createOrderClient(_options: OrderClientOptions): OrderClient {
  const notImplemented = async <T>(): Promise<Result<T, ApiError>> => ({
    ok: false,
    error: {
      kind: "invalid-response",
      errors: ["TODO: zaimplementuj klienta"],
    },
  });

  return {
    getOrder: (): Promise<Result<Order, ApiError>> => notImplemented<Order>(),
    listOrders: (): Promise<Result<readonly Order[], ApiError>> =>
      notImplemented<readonly Order[]>(),
    active: 0,
    pending: 0,
  };
}
