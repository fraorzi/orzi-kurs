import { EventBus } from "./events";

declare module "./events" {
  interface AppEvents {
    paymentCaptured: { orderId: string; amount: number };
    paymentFailed: { orderId: string; reason: string };
  }
}

export function registerPaymentAudit(
  bus: EventBus,
  audit: (line: string) => void,
): () => void {
  const offCaptured = bus.on("paymentCaptured", ({ orderId, amount }) => {
    audit(`captured:${orderId}:${amount.toFixed(2)}`);
  });
  const offFailed = bus.on("paymentFailed", ({ orderId, reason }) => {
    audit(`failed:${orderId}:${reason}`);
  });
  return () => {
    offCaptured();
    offFailed();
  };
}
