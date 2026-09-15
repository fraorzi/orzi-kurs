import { useSyncExternalStore } from "react";

export interface ExternalStore<T> {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
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
