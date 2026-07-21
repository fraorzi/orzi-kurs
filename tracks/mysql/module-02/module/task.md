# Moduł — MarketplaceRepository na mysql2

Zadanie jest **wieloplikowe**. Uzupełnij `src/retry.ts` i `src/repository.ts`;
`src/types.ts` oraz `src/index.ts` są gotowe. Testy działają na prawdziwej
bazie z izolowanym schematem.

## `src/retry.ts` — polityka błędów przejściowych

- `isRetryable(error)`: prawda wyłącznie dla MySQL errno **1213** (deadlock)
  i **1205** (lock wait timeout) — duplikat klucza czy brak stocku nie są
  przejściowe i retry ich nie naprawi;
- `runWithRetry(maxAttempts, operation, onRetry?)`: wykonuje
  `operation(attempt)` od 1 do `maxAttempts`; błąd retryowalny przed limitem
  → `onRetry?.(attempt, error)` i kolejna próba; inny błąd albo limit →
  rethrow. Zwraca wynik pierwszej udanej próby.

## `src/repository.ts` — MarketplaceRepository

- `findListing(publicId)`: **prepared statement** (`execute` + `?`) — dane
  wejściowe nigdy nie trafiają do tekstu SQL; brak wiersza → `null`;
- `placeOrder(input)`: całość przez `runWithRetry(3, ...)`; każda próba:
  połączenie z puli → transakcja → `SELECT ... FOR UPDATE` na listingu →
  walidacja stocku/ilości → INSERT order + order_item (cena z listingu) →
  UPDATE stock → COMMIT; błąd → ROLLBACK i rethrow; połączenie **zawsze**
  wraca do puli (`release` w finally);
- metryki `observe({ operation, outcome, attempt, durationMs })` na każdej
  ścieżce (`success` / `retry` / `error`) — bez SQL i danych klienta.

## Kryteria akceptacji

- injection w `publicId` zwraca `null`, nie wykonuje się;
- wyścig o ostatnią sztukę: dokładnie jedno zamówienie, zero osieroconych
  wierszy, stock 0;
- deadlock/timeout ponawiany maksymalnie 3 razy z metryką `retry`;
  błędy trwałe nie są ponawiane;
- pula nie przecieka: liczba `release` równa liczbie pobrań połączenia.
