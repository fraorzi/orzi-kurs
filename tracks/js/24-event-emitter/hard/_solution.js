export class EventEmitter {
  #events = new Map();

  on(event, handler) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push({ fn: handler, once: false });
    return this;
  }

  once(event, handler) {
    if (!this.#events.has(event)) {
      this.#events.set(event, []);
    }
    this.#events.get(event).push({ fn: handler, once: true });
    return this;
  }

  off(event, handler) {
    const list = this.#events.get(event);
    if (list) {
      this.#events.set(
        event,
        list.filter((l) => l.fn !== handler),
      );
    }
    return this;
  }

  emit(event, ...args) {
    const list = this.#events.get(event);
    if (!list || list.length === 0) {
      return false;
    }
    for (const l of [...list]) {
      l.fn(...args);
      if (l.once) {
        this.off(event, l.fn);
      }
    }
    return true;
  }

  listenerCount(event) {
    return this.#events.get(event)?.length ?? 0;
  }

  removeAllListeners(event) {
    if (event === undefined) {
      this.#events.clear();
    } else {
      this.#events.delete(event);
    }
    return this;
  }
}
