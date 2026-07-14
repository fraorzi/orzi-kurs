export function observable(target, onChange, base = "") {
  const pathFor = (key) => (base ? `${base}.${String(key)}` : String(key));

  return new Proxy(target, {
    get(obj, key, receiver) {
      const value = Reflect.get(obj, key, receiver);
      if (typeof key === "symbol") return value;
      if (value !== null && typeof value === "object") {
        return observable(value, onChange, pathFor(key));
      }
      return value;
    },
    set(obj, key, value, receiver) {
      onChange(pathFor(key), value);
      return Reflect.set(obj, key, value, receiver);
    },
    deleteProperty(obj, key) {
      onChange(pathFor(key), undefined);
      return Reflect.deleteProperty(obj, key);
    },
  });
}
