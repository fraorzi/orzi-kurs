export interface AppEvents {
  ready: null;
}

type Handler<Payload> = (payload: Payload) => void;

export class EventBus {
  readonly #handlers = new Map<keyof AppEvents, Array<Handler<never>>>();

  on<K extends keyof AppEvents>(
    event: K,
    handler: Handler<AppEvents[K]>,
  ): () => void {
    const handlers = this.#handlers.get(event) ?? [];
    handlers.push(handler as Handler<never>);
    this.#handlers.set(event, handlers);
    return () => {
      const index = handlers.indexOf(handler as Handler<never>);
      if (index >= 0) handlers.splice(index, 1);
    };
  }

  emit<K extends keyof AppEvents>(event: K, payload: AppEvents[K]): number {
    const handlers = [...(this.#handlers.get(event) ?? [])];
    for (const handler of handlers) handler(payload as never);
    return handlers.length;
  }
}
