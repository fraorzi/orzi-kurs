# Medium - AbortController: timeout i anulowanie

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Obie funkcje używają `AbortController` i przekazują `signal` do `fetch`.
Błąd abortu rozpoznajesz po `err.name === "AbortError"`.

## 1. `fetchWithTimeout(url, ms)`

Pobierz JSON, ale przerwij żądanie po `ms` milisekundach. Gdy doszło do przerwania -
rzuć `Error("timeout")`. Gdy status nie jest 2xx - rzuć `` `HTTP ${res.status}` ``.
Timer **zawsze** czyść (`finally`).

```js
await fetchWithTimeout("/api/wolne", 30); // rzuca Error("timeout")
await fetchWithTimeout("/api/szybkie", 30); // { ... }
```

## 2. `cancellableFetch(url)`

Zwróć obiekt `{ promise, cancel }`:

- `promise` - obietnica z JSON-em (z obsługą `res.ok` jak wyżej),
- `cancel()` - przerywa żądanie; wtedy `promise` odrzuca się z `Error("cancelled")`.

```js
const { promise, cancel } = cancellableFetch("/api/wolne");
cancel();
await promise; // rzuca Error("cancelled")
```
