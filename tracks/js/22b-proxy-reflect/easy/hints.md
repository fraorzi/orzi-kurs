## Hint 1

Potrzebujesz tylko pułapki `get`. Rozstrzygnięcie „brak vs istnieje" zrób przez
`Reflect.has(obj, key)` — sprawdza obecność klucza niezależnie od jego wartości (dlatego
klucz o wartości `undefined` wciąż „istnieje").

## Hint 2

```js
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
```

Zapisu nie przechwytujesz — bez pułapki `set` idzie on prosto do targetu, więc po
`scores.ola = 3` klucz już istnieje i `get` zwróci `3`.
