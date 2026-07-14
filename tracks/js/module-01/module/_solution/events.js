export function createEmitter() {
  const listeners = new Map();

  return {
    on(event, handler) {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      listeners.get(event).add(handler);
      return () => this.off(event, handler);
    },
    off(event, handler) {
      const set = listeners.get(event);
      if (!set) return;
      set.delete(handler);
      if (set.size === 0) {
        listeners.delete(event);
      }
    },
    emit(event, ...args) {
      const set = listeners.get(event);
      if (!set) return false;
      for (const handler of [...set]) {
        handler(...args);
      }
      return true;
    },
  };
}
