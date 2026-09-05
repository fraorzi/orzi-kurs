# Medium - przetwarzanie porcjami

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## `processInChunks(items, process, chunkSize, onProgress)`

Ciężka pętla po dużej tablicy blokuje event loop - timery i zdarzenia czekają,
aż skończysz. Zaimplementuj przetwarzanie porcjami:

- przetwórz `items` funkcją `process(item)`, zbierając wyniki,
- po każdej porcji `chunkSize` elementów **oddaj kontrolę do event loopa**
  (makrotask - mikrotask nie wystarczy, patrz README),
- po każdej porcji wywołaj `onProgress(done, total)`,
- zwróć promise z tablicą wyników w kolejności wejścia.

```js
const results = await processInChunks(
  bigArray,          // 100 000 elementów
  (x) => x * 2,
  1000,              // porcja
  (done, total) => updateProgressBar(done / total),
);
```

Test weryfikuje, że timer ustawiony przed startem przetwarzania zdąży się wykonać
**w trakcie** - to dowód, że naprawdę oddajesz kontrolę, a nie mielisz wszystkiego
w jednym kawałku.
