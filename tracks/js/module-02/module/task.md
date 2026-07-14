# Moduł 02 — Klient API z retry, timeoutem i kolejką

Zadanie **wieloplikowe**. Uzupełnij pliki w katalogu `src/`. Testy importują z
`src/index.js`, więc publiczne API musi zgadzać się co do nazw.

Warstwy budujesz od dołu: najpierw pojedyncze żądanie (`http.js`), potem sterowanie
przepustowością (`queue.js`), na końcu sklejasz je w klienta (`index.js`).

## `src/http.js` — jedno odporne żądanie

- `class HttpError extends Error` — błąd z polem `status`. Konstruktor:
  `super(\`HTTP ${status}\`)`, `this.name = "HttpError"`, `this.status = status`.
- `requestJson(fetchImpl, url, options = {})` — pobiera i parsuje JSON.
  `options`: `{ retries = 2, backoffMs = 50, timeoutMs = 1000 }`.
  - **Timeout:** opakuj wywołanie w `AbortController`; po `timeoutMs` wywołaj
    `controller.abort()`. `fetchImpl` wołaj jako `fetchImpl(url, { signal })`.
    Timer **zawsze** czyść (`finally` + `clearTimeout`).
  - `res.ok` → zwróć `await res.json()`.
  - Status **4xx** (`< 500`) → rzuć `HttpError` **natychmiast**, bez ponawiania
    (błąd klienta — ponawianie nic nie da).
  - Status **5xx** albo **błąd sieci / timeout** → ponów, aż do `retries` prób.
    Po wyczerpaniu prób rzuć ostatni błąd.
  - Przed każdą kolejną próbą odczekaj `backoffMs * 2 ** (numer_próby - 1)`
    (backoff wykładniczy: 50 ms, 100 ms, 200 ms, …).

## `src/queue.js` — limit współbieżności

- `createQueue(concurrency = 4)` → `{ add, active, pending }`.
  - `add(task)` — `task` to funkcja zwracająca `Promise`. Zwraca `Promise`
    rozstrzygany (lub odrzucany) wynikiem `task()`. Zadanie startuje dopiero, gdy
    liczba aktywnych spadnie poniżej `concurrency`.
  - W każdej chwili działa najwyżej `concurrency` zadań; po zakończeniu jednego
    ruszaj następne z kolejki.
  - `active` (getter) — ile zadań teraz działa. `pending` (getter) — ile czeka.

## `src/index.js` — klient

Re-eksportuj `requestJson`, `HttpError`, `createQueue`. Dodatkowo:

- `createApiClient(options = {})`, `options`:
  `{ fetchImpl = globalThis.fetch, concurrency = 4, retries = 2, backoffMs = 50, timeoutMs = 1000 }`.
  - Utwórz kolejkę `createQueue(concurrency)`.
  - `get(url, overrides = {})` — przepuść `requestJson` przez kolejkę:
    `queue.add(() => requestJson(fetchImpl, url, { retries, backoffMs, timeoutMs, ...overrides }))`.
  - Wystaw `pending` i `active` (gettery delegujące do kolejki).

```js
import { createApiClient } from "./src/index.js";

const client = createApiClient({ concurrency: 4, retries: 3 });
const users = await client.get("/api/users");   // retry + timeout gratis
const roles = await client.get("/api/roles");    // przez tę samą kolejkę
```
