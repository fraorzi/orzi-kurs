import { createOrder } from "./order-store";

export type SubmitOrderState =
  | { readonly status: "success"; readonly orderId: string; readonly replayed: boolean }
  | { readonly status: "conflict" | "pending" };

export async function submitOrder(
  idempotencyKey: string,
  input: { readonly customerId: string; readonly sku: string; readonly quantity: number },
): Promise<SubmitOrderState> {
  "use server";
  void idempotencyKey;
  const result = await createOrder(input);
  return { status: "success", orderId: result.orderId, replayed: false };
}
