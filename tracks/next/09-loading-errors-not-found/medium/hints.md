## Hint 1

Po trimie pustego SKU zwróć `{ status: "validation-error", message: ... }`.

## Hint 2

Adapter zwraca boolean: `false` mapuje się na `conflict`, `true` na `success`.

## Hint 3

Nie otaczaj `await reserve(sku)` szerokim `try/catch`, bo awaria bazy nie jest
oczekiwanym konfliktem biznesowym.
