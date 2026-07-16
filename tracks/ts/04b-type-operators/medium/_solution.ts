export type AppEventMap = {
  userCreated: { userId: number; email: string };
  orderPaid: { orderId: string; amount: number };
  cacheCleared: null;
};

export type EventName = keyof AppEventMap;
export type EventPayload<K extends EventName> = AppEventMap[K];
export type EventEnvelope = {
  [K in EventName]: { type: K; payload: AppEventMap[K] };
}[EventName];

export function makeEvent<K extends EventName>(
  type: K,
  payload: EventPayload<K>,
): Extract<EventEnvelope, { type: K }> {
  return { type, payload } as Extract<EventEnvelope, { type: K }>;
}

export function formatEvent(event: EventEnvelope): string {
  switch (event.type) {
    case "userCreated":
      return `user:${event.payload.userId}:${event.payload.email}`;
    case "orderPaid":
      return `order:${event.payload.orderId}:${event.payload.amount.toFixed(2)}`;
    case "cacheCleared":
      return "cache:cleared";
  }
}
