# Easy - dziel pracę i oddawaj sterowanie

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Endpoint przetwarza duże listy i pod obciążeniem głodzi resztę serwera.
Zaimplementuj `solve(items, batchSize, map)`:

- mapuj elementy partiami po `batchSize`, zachowując kolejność wyników;
- **po każdej partii** oddaj sterowanie pętli zdarzeń przez awaitowane
  `setImmediate()` z `node:timers/promises` - inna praca (I/O, timery)
  ma szansę wykonać się między partiami;
- `batchSize < 1` to `Error`.

Test sprawdza realny przeplot: zadanie zaplanowane przez `setImmediate`
z zewnątrz musi wykonać się **pomiędzy** partiami, nie po całości.
