## Hint 1

`map`/`filter` na tablicy przetwarzają całość i tworzą tablice pośrednie. Te same kroki na
**iteratorze** są leniwe: `take(k)` przerwie ciągnięcie po `k` wynikach, więc `transform`
odpali się tylko tyle razy, ile trzeba.

## Hint 2

```js
export function firstTransformed(items, transform, keep, k) {
  return Iterator.from(items)
    .map(transform)
    .filter(keep)
    .take(k)
    .toArray();
}
```

Kolejność jak w wersji tablicowej (`map` → `filter` → ograniczenie), ale bez tablic
pośrednich i bez pracy ponad `k` wyników.
