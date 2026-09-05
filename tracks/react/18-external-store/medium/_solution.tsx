import { useSyncExternalStore } from "react";

export interface ExternalStore<T> {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getSnapshot: () => T;
  readonly getServerSnapshot: () => T;
}

export function useExternalValue<T>(
  store: ExternalStore<T>,
): T {
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}

export function MessageCounter({
  store,
}: {
  store: ExternalStore<number>;
}) {
  const count = useExternalValue(store);
  return <p>{count} wiadomości</p>;
}
