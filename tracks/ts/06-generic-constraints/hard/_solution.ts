export type EventMap = Record<string, unknown>;

type AnyHandler = (payload: never) => void;

export class EventBus<TEvents extends EventMap> {
  #handlers = new Map<keyof TEvents, AnyHandler[]>();

  #listeners<K extends keyof TEvents>(event: K): AnyHandler[] {
    const existing = this.#handlers.get(event);
    if (existing !== undefined) return existing;

    const created: AnyHandler[] = [];
    this.#handlers.set(event, created);
    return created;
  }

  on<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): () => void {
    this.#listeners(event).push(handler as AnyHandler);
    return () => {
      this.off(event, handler);
    };
  }

  once<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): () => void {
    const wrapped = (payload: TEvents[K]): void => {
      this.off(event, wrapped);
      handler(payload);
    };
    return this.on(event, wrapped);
  }

  off<K extends keyof TEvents>(
    event: K,
    handler: (payload: TEvents[K]) => void,
  ): boolean {
    const listeners = this.#handlers.get(event);
    if (listeners === undefined) return false;

    const index = listeners.indexOf(handler as AnyHandler);
    if (index === -1) return false;

    listeners.splice(index, 1);
    return true;
  }

  emit<K extends keyof TEvents>(event: K, payload: TEvents[K]): number {
    const listeners = this.#handlers.get(event);
    if (listeners === undefined || listeners.length === 0) return 0;

    const snapshot = [...listeners];
    let called = 0;
    for (const handler of snapshot) {
      if (!listeners.includes(handler)) continue;
      const call = handler as (payload: TEvents[K]) => void;
      call(payload);
      called += 1;
    }
    return called;
  }

  listenerCount<K extends keyof TEvents>(event: K): number {
    return this.#handlers.get(event)?.length ?? 0;
  }

  removeAll(): void {
    this.#handlers.clear();
  }
}
