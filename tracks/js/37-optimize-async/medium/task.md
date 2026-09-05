# Medium [O] - ograniczona współbieżność (pool)

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`pooledMap(items, worker, limit)` zwraca tablicę wyników `worker(item)` w kolejności
`items`, przetwarzając **najwyżej `limit`** elementów naraz.

Kod jest **poprawny**, ale sekwencyjny (`await` w pętli) - `maxActive = 1`, `limit` jest
ignorowany. Bramka mierzy współbieżność licznikiem: `maxActive` ma **osiągać `limit`**
(pełne wykorzystanie) i **nigdy go nie przekraczać**. Przepisz na pool, zachowując
kolejność wyników.

```js
// 9 elementów, limit 3 → w każdej chwili aktywne najwyżej 3, docelowo dokładnie 3
await pooledMap([1, 2, 3, 4, 5], async (x) => x * 2, 2); // [2, 4, 6, 8, 10]
```

Podpowiedź kierunkowa: uruchom `limit` „pracowników", z których każdy w pętli bierze
kolejny wolny indeks z zadań, aż się skończą.
