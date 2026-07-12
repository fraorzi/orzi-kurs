# Hard [O] — batching: jedno żądanie na id → paczki

`batchFetch(ids, fetchBatch, size)` zwraca wyniki dla wszystkich `ids`, w kolejności.
`fetchBatch(idsChunk)` przyjmuje **tablicę** id i zwraca tablicę wyników w tej samej
kolejności.

Kod jest **poprawny**, ale woła `fetchBatch` osobno dla **każdego** id (n wywołań),
ignorując `size`. Bramka liczy wywołania `fetchBatch`: ma być `ceil(n / size)`, nie `n`.
Przepisz tak, by grupować id w paczki po `size`, zachowując kolejność wyników.

```js
// fetchBatch(chunk) zwraca chunk.map(id => id * 10)
await batchFetch([1, 2, 3, 4], fetchBatch, 2); // [10, 20, 30, 40]
// fetchBatch wołane 2 razy: [1,2] i [3,4] — nie 4 razy
```

Podpowiedź kierunkowa: potnij `ids` na kawałki po `size`, pobierz każdy kawałek jednym
wywołaniem, a wyniki sklej w kolejności.
