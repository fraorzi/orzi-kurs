import {
  beginIdempotent,
  completeIdempotent,
  releaseIdempotent,
} from "./idempotency-store";
import { createOrder } from "./order-store";

export type SubmitOrderState =
  | { readonly status: "success"; readonly orderId: string; readonly replayed: boolean }
  | { readonly status: "conflict" | "pending" };

export async function submitOrder(
  idempotencyKey: string,
  input: { readonly customerId: string; readonly sku: string; readonly quantity: number },
): Promise<SubmitOrderState> {
  "use server";
  const fingerprint = JSON.stringify({
    customerId: input.customerId,
    sku: input.sku,
    quantity: input.quantity,
  });
  const attempt = await beginIdempotent(idempotencyKey, fingerprint);

  if (attempt.kind === "completed") {
    return { status: "success", orderId: attempt.result.orderId, replayed: true };
  }
  if (attempt.kind === "conflict" || attempt.kind === "pending") {
    return { status: attempt.kind };
  }

  try {
    const result = await createOrder(input);
    await completeIdempotent(idempotencyKey, result);
    return { status: "success", orderId: result.orderId, replayed: false };
  } catch (error) {
    await releaseIdempotent(idempotencyKey);
    throw error;
  }
}
