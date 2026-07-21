## Hint 1

Czerwony jest tylko `[quality]` — starter zwraca poprawny kształt, ale
`fields` ma 3 pozycje i `populate: "*"`.

## Hint 2

Widok potrzebuje `title` i `slug` z rekordu oraz `url`/`alternativeText`
z relacji `cover` — nic więcej.

## Hint 3

`populate` zamień z `"*"` na `{ cover: { fields: ["url", "alternativeText"] } }`
— jawne pola relacji zamiast całej.
