export type EventHandlers<Event extends { type: string }> = Record<
  Event["type"],
  (event: Event) => void
>;
