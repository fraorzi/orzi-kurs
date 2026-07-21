## Hint 1

Tablica wiedzy to mapa `kind → { status, code, message }` — trzy znane
wpisy, żaden z nich nie czyta `error.message`.

## Hint 2

Domyślny przypadek (`kind` brak albo nieznany) zwraca stałą wartość
`{ status: 500, code: "INTERNAL_ERROR", message: "Błąd serwera" }` —
zapisaną wprost w kodzie, nie zbudowaną z `error.message`.

## Hint 3

Test celowo wsadza w `error.message` treść, która nie może wyciec
(`"password=secret"`, `"SQL secret"`) — jeśli Twój `message` w odpowiedzi
kiedykolwiek zawiera fragment oryginalnego `error.message`, to bug.
