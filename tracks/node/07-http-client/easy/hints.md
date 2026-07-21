## Hint 1

Kolejność bramek: najpierw `response.ok`, potem `content-type`, na końcu
`response.json()` — walidujesz zanim czytasz body.

## Hint 2

Nagłówek czytasz przez `response.headers.get("content-type")`; może być
`null`, więc łańcuch z `?.includes("application/json")`.

## Hint 3

Komunikat błędu statusu zbuduj z `response.status` — test szuka w nim liczby.
