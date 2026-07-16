import { EventBus } from "./events";

// TODO: declare module "./events" i rozszerz AppEvents o dwa zdarzenia płatności.

export function registerPaymentAudit(
  bus: EventBus,
  audit: (line: string) => void,
): () => void {
  // TODO: zarejestruj oba handlery i zwróć wspólne unsubscribe
  return () => {};
}
