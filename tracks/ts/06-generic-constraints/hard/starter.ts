export type EventMap = Record<string, unknown>;

// TODO
export class EventBus<TEvents> {
  // TODO

  on<K>(event: K, handler: (payload: unknown) => void): () => void {
    // TODO
    throw new Error("TODO");
  }

  once<K>(event: K, handler: (payload: unknown) => void): () => void {
    // TODO
    throw new Error("TODO");
  }

  off<K>(event: K, handler: (payload: unknown) => void): boolean {
    // TODO
    return false;
  }

  emit<K>(event: K, payload: unknown): number {
    // TODO
    return 0;
  }

  listenerCount<K>(event: K): number {
    // TODO
    return 0;
  }

  removeAll(): void {
    // TODO
  }
}
