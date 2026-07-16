export type EventMap = Record<string, unknown>;

// TODO: ogranicz TEvents do EventMap; K do keyof TEvents; ładunek do TEvents[K].
export class EventBus<TEvents> {
  // TODO: prywatny w runtime rejestr handlerów (#handlers)

  on<K>(event: K, handler: (payload: unknown) => void): () => void {
    // TODO: zarejestruj handler, zwróć funkcję odpinającą
    throw new Error("TODO");
  }

  once<K>(event: K, handler: (payload: unknown) => void): () => void {
    // TODO: handler odpala się najwyżej raz
    throw new Error("TODO");
  }

  off<K>(event: K, handler: (payload: unknown) => void): boolean {
    // TODO: odepnij konkretny handler; true, jeśli był zarejestrowany
    return false;
  }

  emit<K>(event: K, payload: unknown): number {
    // TODO: wywołaj handlery w kolejności rejestracji; zwróć ich liczbę
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
