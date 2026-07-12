export function observable(target, onChange) {
  const store = { ...target };
  const result = {};
  for (const key of Object.keys(target)) {
    Object.defineProperty(result, key, {
      enumerable: true,
      configurable: true,
      get() {
        return store[key];
      },
      set(value) {
        const old = store[key];
        if (value !== old) {
          store[key] = value;
          onChange(key, value, old);
        }
      },
    });
  }
  return result;
}
