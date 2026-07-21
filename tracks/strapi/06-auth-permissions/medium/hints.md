## Hint 1

`permissions[role]` może być `undefined` — użyj `?.includes(action)` i
domknij wynik przez `?? false`, żeby brakująca rola nigdy nie rzuciła.

## Hint 2

`Array.includes` sprawdza dokładne dopasowanie elementu, nie podłańcuch —
to wystarczy, żeby `find` i `find-one` się nie myliły; nie sięgaj po
`startsWith` ani `includes` na stringu.

## Hint 3

Brak wpisu roli i brak wpisu akcji to ta sama odpowiedź: `false`. Nie
potrzebujesz osobnej gałęzi na "rola nie istnieje" — `?.` już to załatwia.
