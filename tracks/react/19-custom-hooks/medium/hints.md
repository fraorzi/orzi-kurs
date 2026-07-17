## Hint 1

Przekaż funkcję do `useState`: `useState(() => storage.getItem(key) ?? initialValue)`.

## Hint 2

Osobny efekt synchronizuje aktualny draft do storage.

## Hint 3

Zależności efektu to `draft`, `key` i `storage`.
