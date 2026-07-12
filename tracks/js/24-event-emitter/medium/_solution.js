export function createEmitter() {
  const events = new Map();

  const add = (event, fn, once) => {
    if (!events.has(event)) {
      events.set(event, []);
    }
    events.get(event).push({ fn, once });
  };

  const remove = (event, fn) => {
    const list = events.get(event);
    if (list) {
      events.set(
        event,
        list.filter((l) => l.fn !== fn),
      );
    }
  };

  return {
    on(event, handler) {
      add(event, handler, false);
      return () => remove(event, handler);
    },
    once(event, handler) {
      add(event, handler, true);
    },
    off(event, handler) {
      remove(event, handler);
    },
    emit(event, ...args) {
      for (const l of [...(events.get(event) ?? [])]) {
        l.fn(...args);
        if (l.once) {
          remove(event, l.fn);
        }
      }
    },
  };
}
