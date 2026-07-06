## Hint 1

Liczba jest parzysta, gdy `n % 2 === 0`. Uważaj na `0` i liczby ujemne — dla nich też działa.

## Hint 2

Użyj `filter` + `reduce` (albo pojedynczej pętli). Metody `filter`, `map`, `reduce`
zwracają nową tablicę/wartość i **nie** mutują wejścia, więc warunek "nie mutuje" masz za darmo.
