## Hint 1

Potnij `ids` na kawałki po `size` (pętla `i += size` + `slice`). Każdy kawałek pobierz
**jednym** wywołaniem `fetchBatch(chunk)`. Wyniki paczek sklej w jedną tablicę, zachowując
kolejność (`flat()`).

## Hint 2

```js
export async function batchFetch(ids, fetchBatch, size) {
  const batches = [];
  for (let i = 0; i < ids.length; i += size) {
    batches.push(ids.slice(i, i + size));
  }
  const batchResults = await Promise.all(batches.map(fetchBatch));
  return batchResults.flat();
}
```

`Promise.all` puszcza paczki równolegle, a `flat()` zachowuje ich kolejność — więc wyniki
są zgodne z wejściem. Liczba wywołań `fetchBatch` spada z `n` do `ceil(n / size)`.
