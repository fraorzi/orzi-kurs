export function createWeakValueMap() {
  const map = new Map();
  const registry = new FinalizationRegistry((key) => {
    const ref = map.get(key);
    if (ref && ref.deref() === undefined) map.delete(key);
  });
  return {
    set(key, value) {
      map.set(key, new WeakRef(value));
      registry.register(value, key);
    },
    get(key) {
      return map.get(key)?.deref();
    },
    has(key) {
      return map.get(key)?.deref() !== undefined;
    },
  };
}
