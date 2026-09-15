import { useSyncExternalStore } from "react";

export interface CartItem {
  id: string;
  price: number;
}

export interface CartSnapshot {
  itemCount: number;
  total: number;
}

export interface CartStore {
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => CartSnapshot;
  getServerSnapshot: () => CartSnapshot;
  addItem: (item: CartItem) => void;
}

function summarize(
  items: CartItem[],
): CartSnapshot {
  return {
    itemCount: items.length,
    total: items.reduce((sum, item) => sum + item.price, 0),
  };
}

export function createCartStore(
  initialItems: CartItem[],
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
