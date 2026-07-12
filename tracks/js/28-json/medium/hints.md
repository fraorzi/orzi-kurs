## Hint 1

Replacer i reviver to funkcje `(key, value) => ...`, wołane dla każdej pary klucz-wartość
(rekurencyjnie, także w głąb).
- replacer: zwróć `undefined`, by pominąć pole.
- reviver: zwróć przekształconą wartość (albo tę samą).

## Hint 2

```js
export function stringifyHidingSecrets(obj) {
  return JSON.stringify(obj, (key, value) =>
    key === "password" || key === "token" ? undefined : value,
  );
}

export function parseWithDates(str) {
  const ISO = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/;
  return JSON.parse(str, (key, value) =>
    typeof value === "string" && ISO.test(value) ? new Date(value) : value,
  );
}
```
