## Hint 1

`indexOf` i `lastIndexOf` przechodzą tablicę za każdym razem — a robisz to dla każdego
elementu, stąd O(n²). Policz liczności wszystkich wartości **jednym** przejściem (Map),
potem drugim przejściem znajdź pierwszą o liczności 1.

## Hint 2

```js
export function firstUnique(arr) {
  const counts = new Map();
  for (const x of arr) counts.set(x, (counts.get(x) ?? 0) + 1);
  for (const x of arr) if (counts.get(x) === 1) return x;
  return undefined;
}
```

Dwa przejścia liniowe (zliczenie + wyszukanie) to nadal O(n) — dużo lepiej niż O(n²)
z powtarzanym skanowaniem. Drugie przejście po `arr` (nie po `counts`) zachowuje kolejność.
