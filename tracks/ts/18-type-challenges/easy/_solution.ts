export type EventHandlers<Event extends { type: string }> = {
  [Current in Event as Current["type"]]: (event: Current) => void;
};
