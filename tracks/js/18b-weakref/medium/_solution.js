export function createWeakCache(compute) {
  let ref;
  return {
    get() {
      const cached = ref?.deref();
      if (cached !== undefined) return cached;
      const value = compute();
      ref = new WeakRef(value);
      return value;
    },
  };
}
