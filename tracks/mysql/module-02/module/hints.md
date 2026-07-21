## Hint 1

Zacznij od `retry.ts` — testy jednostkowe polityki nie dotykają bazy.
`isRetryable` czyta `errno` z obiektu błędu (zawęź `unknown` przez
`typeof`/`in`), a lista przejściowych to dokładnie 1213 i 1205.

## Hint 2

`runWithRetry` to pętla `for (let attempt = 1; ; attempt++)` z try/catch:
sukces → `return`; błąd nieretryowalny **albo** `attempt >= maxAttempts` →
`throw`; inaczej `onRetry?.(attempt, error)` i kolejny obieg.

## Hint 3

`findListing`: `pool.execute("... WHERE public_id=?", [publicId])` —
placeholder zamiast interpolacji załatwia test injection. Brak wiersza to
`listings[0] ?? null`.

## Hint 4

`placeOrder`: całą próbę opakuj w `runWithRetry(3, async (attempt) => {...})`.
Wewnątrz próby: `getConnection` → try z transakcją i `FOR UPDATE` → catch
z `rollback` i rethrow → **finally z `release()`** — test puli liczy, że
każde pobrane połączenie wróciło, także po błędach.

## Hint 5

Metryki: `success` z numerem udanej próby, `retry` w callbacku `onRetry`,
`error` raz — po ostatecznej porażce. W wartościach metryk nie może być
SQL-a ani danych wejściowych (test skanuje wartości pod kątem `requestId`).
