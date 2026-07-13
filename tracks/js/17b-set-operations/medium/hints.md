## Hint 1

Twórz nowy `Set` na wynik i wypełniaj go pętlą `for..of`, sprawdzając przynależność przez
`has()`. Nigdy nie dodawaj/usuwaj elementów w `a` ani `b`.

## Hint 2

- `intersection`: wybierz mniejszy zbiór, iteruj po nim, dodawaj `x`, gdy `large.has(x)`.
- `difference`: iteruj po `a`, dodawaj `x`, gdy `!b.has(x)`.
- `isSubset`: iteruj po `a`, jeśli któryś `x` nie jest w `b` → `return false`; na końcu `true`.

## Hint 3

```js
export function intersection(a, b) {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  const out = new Set();
  for (const x of small) if (large.has(x)) out.add(x);
  return out;
}
export function difference(a, b) {
  const out = new Set();
  for (const x of a) if (!b.has(x)) out.add(x);
  return out;
}
export function isSubset(a, b) {
  for (const x of a) if (!b.has(x)) return false;
  return true;
}
```
