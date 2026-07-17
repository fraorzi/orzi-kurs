## Hint 1

Sygnatura potrzebuje `<T, K extends PropertyKey>`.

## Hint 2

`items` to `readonly T[]`, selector zwraca `K`, a wynik to `Map<K, T>`.

## Hint 3

Buduj `new Map<K, T>()` i zapisuj elementy w pętli.
