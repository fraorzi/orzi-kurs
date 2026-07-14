export function createCache() {
  const store = new Map();
  const keyOf = (query, page) => `${query}::${page}`;

  return {
    has(query, page) {
      return store.has(keyOf(query, page));
    },
    get(query, page) {
      return store.get(keyOf(query, page));
    },
    set(query, page, value) {
      store.set(keyOf(query, page), value);
      return value;
    },
    get size() {
      return store.size;
    },
    clear() {
      store.clear();
    },
  };
}
