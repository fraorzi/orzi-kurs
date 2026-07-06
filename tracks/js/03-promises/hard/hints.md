## Hint 1

Pomyśl o „workerach": uruchom `limit` równoległych pętli. Każda pętla bierze następny
wolny indeks z **współdzielonego licznika** (domknięcie!), wykonuje `tasks[i]`, zapisuje
`results[i]` i bierze kolejny indeks, aż zabraknie zadań.

## Hint 2

Szkielet: `let next = 0; const results = [];` plus async funkcja `worker()`:
`while (next < tasks.length) { const i = next++; results[i] = await tasks[i](); }`.
Współdzielony `next` gwarantuje, że każdy indeks trafi do dokładnie jednego workera.

## Hint 3

Uruchom `Math.min(limit, tasks.length)` workerów i zaczekaj na wszystkie:
`await Promise.all(workers)`. Błąd z workera wyleci z `Promise.all` — a żeby kolejka
stanęła po błędzie, ustaw np. flagę `failed = true` sprawdzaną w warunku pętli
(albo `next = tasks.length`).
