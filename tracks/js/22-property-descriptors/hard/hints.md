## Hint 1

Trzymaj wartości w osobnym obiekcie `store` (kopia `target`, np. `{ ...target }`), żeby
gettery/settery miały gdzie czytać i pisać, a oryginał został nietknięty. Na nowym obiekcie
`result` zdefiniuj akcesor per klucz.

## Hint 2

```js
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
        if (value !== old) {   // powiadamiaj tylko przy realnej zmianie
          store[key] = value;
          onChange(key, value, old);
        }
      },
    });
  }
  return result;
}
```

Uwaga na domknięcie: `key` z `for..of` (z `let`/`const` w nagłówku) ma własne wiązanie
na iterację, więc każdy akcesor pamięta swój klucz.
