# Hard — typowany pool z anulowaniem

Zaimplementuj `mapConcurrent(items, limit, worker, signal?)`.

- wynik to `Promise<Result[]>` w kolejności wejścia,
- najwyżej `limit` workerów aktywnych jednocześnie,
- `limit` musi być dodatnią liczbą całkowitą,
- przed startem i przed każdym nowym elementem sprawdź `signal`,
- po anulowaniu nie uruchamiaj nowych elementów i odrzuć `AbortError`,
- nie mutuj wejścia.

Worker ma sygnaturę `(item, index, signal) => Promise<Result>`.
