# Hints

## Hint 1

Token dowodzi tożsamości (authn), rola dowodzi uprawnień (authz) — to dwa
niezależne pytania. `allowed` musi wymagać obu, nie samego `Boolean(token)`.

## Hint 2

Rate limit sprawdzaj przed resztą logiki i daj mu najwyższy priorytet w
wyniku: nawet poprawny, uprawniony editor dostaje `429`, jeśli przekroczył
próg prób. Kolejność `if`-ów odzwierciedla priorytet.

## Hint 3

`log: { ...input }` kopiuje wszystko, łącznie z `token` i `password`.
Zbuduj log jako nowy obiekt z jawną allow-listą pól (`requestId`, `role`,
`outcome`) — nie modyfikuj/usuwaj pól z kopii wejścia, twórz go od zera.
