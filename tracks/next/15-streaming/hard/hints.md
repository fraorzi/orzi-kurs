## Hint 1

Po sprawdzeniu metadata pobierz iterator, ale `next()` wywołuj dopiero w `pull()` strumienia.
## Hint 2

Pierwszy `pull()` może wysłać sam nagłówek; w `cancel()` użyj opcjonalnego `iterator.return?.()`.
