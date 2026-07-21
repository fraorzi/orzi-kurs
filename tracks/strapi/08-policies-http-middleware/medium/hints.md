## Hint 1

Waliduj `ctx.requestId` regexem `/^[A-Za-z0-9-]{8,64}$/` — nagłówek
klienta to niezaufany string, nie licznik czy UUID z gwarancją formatu.

## Hint 2

Ustal wynikową wartość jednym wyrażeniem: `valid ? ctx.requestId : generate()`.
Zapisz ją raz do zmiennej i użyj w obu miejscach (`state` i `headers`), żeby
nie rozjechały się przy literówce.

## Hint 3

Kolejność ma znaczenie: najpierw `state`/`headers`, dopiero potem
`await next()` — kontroler musi zastać już gotowe id, gdy dostanie
sterowanie.
