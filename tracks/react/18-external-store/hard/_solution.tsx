import { useSyncExternalStore } from "react";

export interface CartItem {
  readonly id: string;
  readonly price: number;
}

export interface CartSnapshot {
  readonly itemCount: number;
  readonly total: number;
}

export interface CartStore {
  readonly subscribe: (callback: () => void) => () => void;
  readonly getSnapshot: () => CartSnapshot;
  readonly getServerSnapshot: () => CartSnapshot;
  readonly addItem: (item: CartItem) => void;
}

function summarize(
  items: readonly CartItem[],
): CartSnapshot {
  return {
    itemCount: items.length,
    total: items.reduce((sum, item) => sum + item.price, 0),
  };
}

export function createCartStore(
  initialItems: readonly CartItem[],
): CartStore {
  let items = [...initialItems];
  const listeners = new Set<() => void>();
  let snapshot = summarize(items);

  return {
    subscribe(callback) {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    getSnapshot: () => snapshot,
    getServerSnapshot: () => snapshot,
    addItem(item) {
      items = [...items, item];
      snapshot = summarize(items);
      listeners.forEach((listener) => listener());
    },
  };
}

export function CartSummary({
  store,
}: {
  store: CartStore;
}) {
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return (
    <section>
      <p>{`${snapshot.itemCount} produktów`}</p>
      <output aria-label="Suma">{`${snapshot.total} zł`}</output>
    </section>
  );
}
