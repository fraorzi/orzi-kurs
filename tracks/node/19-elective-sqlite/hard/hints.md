## Hint 1

Kolejność kroków: posortuj kopię, zwaliduj wersje (całkowite ≥ 1, bez
duplikatów przez `Set`), przefiltruj `> current`, sprawdź ciągłość.

## Hint 2

Ciągłość planu: element na pozycji `index` musi mieć wersję
`current + index + 1` — jedna pętla, jeden warunek.

## Hint 3

Sortuj kopię (`[...migrations].sort(...)`) — wejście jest `readonly`
i mutowanie go byłoby efektem ubocznym widocznym u wywołującego.
