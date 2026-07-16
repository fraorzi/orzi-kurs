## Hint 1

Użyj `Map<Key, ...>`. Kolejność iteracji `Map` jest kolejnością wstawienia, więc
najstarszy klucz znajdziesz przez `cache.keys().next()`.

## Hint 2

Przy trafieniu usuń wpis i wstaw go ponownie. W ten sposób staje się najnowszy bez
budowania osobnej listy użycia.

## Hint 3

Przechowuj `{ value: Result }`, a nie samo `Result`. Dzięki temu `cache.get(key) ===
undefined` jednoznacznie oznacza brak wpisu nawet wtedy, gdy legalnym wynikiem
selektora jest `undefined`.
