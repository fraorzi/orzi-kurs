export function createEmitter() {
  const events = new Map();
  return {
    on(event, handler) {
      if (!events.has(event)) {
        events.set(event, []);
      }
      events.get(event).push(handler);
    },
    emit(event, payload) {
      const handlers = events.get(event) ?? [];
      for (const handler of [...handlers]) {
        handler(payload);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) {
        events.set(
          event,
          handlers.filter((h) => h !== handler),
        );
      }
    },
  };
}
