# Moduł 05 — Harmonogram zadań: pool, retry, batching

Zadanie **wieloplikowe**. Uzupełnij pliki w katalogu `src/`. Testy importują z
`src/index.js`, więc publiczne API musi zgadzać się co do nazw.

Budujesz warstwę, która okiełznuje ruch: ogranicza liczbę równoczesnych zadań (pool),
ponawia chwilowe awarie (retry z backoffem) i skleja pojedyncze żądania w jedno
(batching). Każdy kawałek osobno, a `index.js` składa je w harmonogram.

## `src/pool.js` — limit współbieżności

- `createPool(concurrency = 4)` → `{ run, runAll, active, maxActive }`.
  - `run(task)` — `task` zwraca `Promise`; zwróć `Promise` z jego wynikiem. W każdej
    chwili działa najwyżej `concurrency` zadań; po zakończeniu jednego ruszaj kolejne
    (pomocnik `pump()` startujący zadania póki jest miejsce).
  - `runAll(tasks)` — `Promise.all` z `run()` dla każdego (wyniki w kolejności wejścia).
  - `active` (getter) — ile teraz działa; `maxActive` (getter) — rekord równoczesnych.

## `src/retry.js` — ponawianie z backoffem

- `withRetry(task, options = {})`, `options`: `{ retries = 2, backoffMs = 50 }`.
  - Sukces `task()` → zwróć wynik.
  - Błąd → zapamiętaj i spróbuj ponownie, o ile zostały próby.
  - Przed każdą kolejną próbą odczekaj `backoffMs * 2 ** (numer_próby - 1)`.
  - Po wyczerpaniu prób rzuć ostatni błąd.

## `src/batch.js` — grupowanie żądań

- `createBatcher(batchFn, options = {})`, `options`: `{ maxSize = Infinity }`.
  - `load(key)` — dorzuć klucz do kolejki, zwróć `Promise` na jego wynik; gdy kolejka
    osiągnie `maxSize` → automatyczny `flush()`.
  - `flush()` — pusta kolejka → `Promise.resolve()`; inaczej zawołaj `batchFn(keys)`
    **raz** dla wszystkich zebranych kluczy i rozdaj wyniki (tablica w tej samej
    kolejności) do właściwych `Promise`'ów; wyczyść kolejkę. Gdy `batchFn` odrzuci —
    odrzuć wszystkie `Promise`'y z partii.
  - `size` (getter) — ile kluczy czeka.

## `src/index.js` — harmonogram

Re-eksportuj `createPool`, `withRetry`, `createBatcher`. Dodatkowo:

- `createScheduler(options = {})`, `options`: `{ concurrency = 4, retries = 2, backoffMs = 50 }`.
  - Utwórz `createPool(concurrency)`.
  - `run(task)` — przepuść przez pool zadanie owinięte w retry:
    `pool.run(() => withRetry(task, { retries, backoffMs }))`.
  - `runAll(tasks)` — `Promise.all` z `run()` dla każdego.
  - `active` / `maxActive` (gettery) delegujące do poolu.

```js
import { createScheduler, createBatcher } from "./src/index.js";

const scheduler = createScheduler({ concurrency: 3, retries: 2 });
const pages = await scheduler.runAll(urls.map((u) => () => fetchJson(u)));

const users = createBatcher((ids) => fetchUsers(ids), { maxSize: 100 });
const [a, b] = await Promise.all([users.load(1), users.load(2)]); // jeden fetch
```
