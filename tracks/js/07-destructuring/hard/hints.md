## Hint 1

`normalizeUser`: destrukturyzuj w sygnaturze `({ name, age = 18, ...rest })`
— walidację rób na `name` po destrukturyzacji (uwaga: destrukturyzacja
z defaultem nie waliduje!). `zip`: znajdź minimalną długość, potem podwójna
pętla / `map` po indeksach. `partition`: jedna pętla, dwa koszyki.

## Hint 2

`normalizeUser`: `if (typeof name !== "string" || name.trim() === "") throw
new TypeError(...)`. `zip`: `Math.min(...arrays.map((a) => a.length))` —
uwaga: `Math.min()` bez argumentów to `Infinity`, obsłuż `zip()` wcześniej
(np. `if (arrays.length === 0) return []`).

## Hint 3

```js
export function zip(...arrays) {
  if (arrays.length === 0) return [];
  const length = Math.min(...arrays.map((a) => a.length));
  return Array.from({ length }, (_, i) => arrays.map((a) => a[i]));
}
```
