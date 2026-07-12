# Średnia z tablicy (wieloplikowo)

Kod jest rozbity na dwa pliki w `src/`:

- `src/math.js` — funkcja pomocnicza `sum(nums)` (suma elementów).
- `src/index.js` — funkcja `average(nums)`, która używa `sum` i zwraca średnią.

Uzupełnij **oba** pliki tak, aby `average` zwracała średnią arytmetyczną liczb.
Dla pustej tablicy zwróć `0`. Nie mutuj wejścia.

## Sygnatura

```js
// src/index.js
export function average(nums) { /* ... */ }
```

## Przykłady

| wejście        | wynik |
| -------------- | ----- |
| `[2, 4, 6]`    | `4`   |
| `[10]`         | `10`  |
| `[]`           | `0`   |
