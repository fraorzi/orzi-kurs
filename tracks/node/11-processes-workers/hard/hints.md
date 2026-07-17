## Hint 1

Stan managera: `let nextId = 1` i `Map<number, { resolve, reject }>`.
Limit sprawdzasz przez `pending.size` **przed** rejestracją.

## Hint 2

`resolve(id, value)`: `pending.get(id)` — brak wpisu to zwykły `return`
(spóźniona odpowiedź), inaczej `delete` z mapy i rozstrzygnięcie promisa.

## Hint 3

`fail(error)`: iteruj po `pending.values()`, odrzuć każdy, potem
`pending.clear()` — kolejność ma znaczenie, żeby nowe żądania rejestrowane
z callbacków odrzuceń nie zostały wyczyszczone.
