## Hint 1

Przechwyć zapis pułapką `set(obj, key, value, receiver)`. Regułę weź jako
`validators[key]` — jeśli jej nie ma, po prostu przepuść zapis.

## Hint 2

```js
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
```

Rzucenie wyjątku przerywa zapis (do `Reflect.set` nie dojdzie), więc stara wartość zostaje.
`return Reflect.set(...)` oddaje wymagany `boolean` — bez tego strict mode rzuci `TypeError`
przy udanym zapisie.
