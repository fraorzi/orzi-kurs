## Hint 1

`ORDER BY created_at DESC` samo nie wystarcza — przy remisach czasu wynik
zależy od planu wykonania, nie od danych.

## Hint 2

Dodaj `id DESC` jako drugi klucz sortowania — ten sam kierunek co
`created_at`, żeby porządek pozostał spójny.

## Hint 3

`ORDER BY created_at DESC, id DESC LIMIT 3 OFFSET 3` — sprawdź wynik na
zbiorze bez remisów i na zbiorze, gdzie wszystkie wiersze mają identyczny
`created_at`.
