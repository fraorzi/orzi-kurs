export function withValidation(target, validators) {
  return new Proxy(target, {
    set(obj, key, value, receiver) {
      const validate = validators[key];
      if (validate && !validate(value)) {
        throw new TypeError(`niepoprawna wartość dla ${String(key)}`);
      }
      return Reflect.set(obj, key, value, receiver);
    },
  });
}
