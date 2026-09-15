import { useEffect, useState } from "react";

export interface ExternalStore<T> {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => T;
  getServerSnapshot: () => T;
}

export function useExternalValue<T>(
  store: ExternalStore<T>,
): T {
  const [value, setValue] = useState(store.getSnapshot);

  useEffect(() => {
    store.subscribe(() => {
      setValue(store.getSnapshot());
    });
  }, [store]);

  return value;
}

export function MessageCounter({
  store,
}: {
  store: ExternalStore<number>;
}) {
  const count = useExternalValue(store);
  return <p>{count} wiadomości</p>;
}
