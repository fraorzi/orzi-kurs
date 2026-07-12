## Hint 1

Każdy `filter` w `reduce` przechodzi całą tablicę i tworzy nową — a robisz to raz na
usuwaną wartość, stąd O(k·n). Zbuduj `Set` usuwanych **raz**, potem jednym `filter`
odrzuć te, które w nim są.

## Hint 2

```js
export function removeAll(arr, toRemove) {
  const remove = new Set(toRemove);
  return arr.filter((x) => !remove.has(x));
}
```

Jeden `filter` (O(n)) z testem `remove.has(x)` w O(1) zastępuje `k` pełnych przejść.
Jedna tablica pośrednia zamiast `k`.
