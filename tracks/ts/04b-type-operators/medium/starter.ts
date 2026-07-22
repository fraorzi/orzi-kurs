export type AppEventMap = {
  userCreated: { userId: number; email: string };
  orderPaid: { orderId: string; amount: number };
  cacheCleared: null;
};

// TODO
export type EventName = string;

// TODO
export type EventPayload<K extends EventName> = unknown;

// TODO
export type EventEnvelope = {
  type: EventName;
  payload: unknown;
};

export function makeEvent<K extends EventName>(
  type: K,
  payload: EventPayload<K>,
): Extract<EventEnvelope, { type: K }> {
  // TODO
  throw new Error("TODO");
}

export function formatEvent(event: EventEnvelope): string {
  // TODO
  return "";
}
