## Hint 1

Allow-list jako `Set` trzech dozwolonych MIME-typów —
`ALLOWED.has(file.mime)` czytelniej niż łańcuch `||`.

## Hint 2

`Number.isInteger(file.size) && file.size > 0` odrzuca jednym
wyrażeniem zero, liczby ujemne i wartości niecałkowite.

## Hint 3

Limit to `<=`, nie `<` — plik dokładnie 5 MiB ma przejść, dopiero
5 MiB + 1 bajt ma zostać odrzucony.
