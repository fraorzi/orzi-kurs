export function subscribeAll(emitter, events, handler) {
  for (const event of events) {
    emitter.on(event, handler);
  }
  return () => {
    emitter.off(events[0], handler);
  };
}
