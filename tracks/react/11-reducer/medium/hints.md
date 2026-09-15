## Hint 1

Sprawdź referencję tablicy i rekordów zwracanych z każdej gałęzi reducera. React
nie zobaczy zmiany, jeśli reducer zmutuje dane i zwróci tę samą tablicę.

## Hint 2

Dodawanie używa spreadu, przełączenie `map`, a usunięcie `filter`.

## Hint 3

Gałąź `added` zwraca nową tablicę, `toggled` mapuje ją i kopiuje tylko zmieniony
rekord, a `deleted` zwraca wynik `filter`. Nie mutuj `tasks` ani `action.task`.
