## Hint 1

Helper może zwracać CORS headers wyłącznie dla dokładnie dozwolonego originu.

## Hint 2

Sprawdź nagłówki i limit przed `await request.json()`.

## Hint 3

OPTIONS zwraca 204 oraz allow-methods `POST, OPTIONS` i allow-headers
`content-type, x-api-key`.
