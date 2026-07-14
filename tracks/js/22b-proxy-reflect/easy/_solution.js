export function withDefault(target, defaultValue) {
  return new Proxy(target, {
    get(obj, key, receiver) {
      if (Reflect.has(obj, key)) {
        return Reflect.get(obj, key, receiver);
      }
      return defaultValue;
    },
  });
}
