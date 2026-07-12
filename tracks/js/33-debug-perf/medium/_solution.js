export function subscribeAll(emitter, events, handler) {
  for (const event of events) {
    emitter.on(event, handler);
  }
  return () => {
    for (const event of events) {
      emitter.off(event, handler);
    }
  };
}
