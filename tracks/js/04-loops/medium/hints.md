## Hint 1

`primesUpTo`: funkcja pomocnicza `isPrime(x)` z pętlą sprawdzającą dzielniki
i wczesnym `return false`; główna pętla tylko filtruje kandydatów.
`chessboard`: dwie zagnieżdżone pętle (wiersze × kolumny); o znaku decyduje
parzystość sumy indeksów. `firstIndexWhere`: zwykły `for` z `return i`.

## Hint 2

`isPrime`: wystarczy sprawdzać dzielniki do `j * j <= x` — jeśli x ma dzielnik
większy od pierwiastka, ma też mniejszy. `chessboard`: `(row + col) % 2 === 0
? " " : "#"`; `"\n"` doklejaj po wewnętrznej pętli. `firstIndexWhere`: `return`
wewnątrz pętli jest najczystszym „break z wynikiem" — po przejściu całej pętli
`return -1`.
