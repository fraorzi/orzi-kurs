## Hint 1

Kolejność w handlerze to sedno bugu: przenieś `seen.add(event.id)` **za**
`await apply(...)`. Dopóki apply nie przejdzie, zdarzenie nie jest przetworzone.

## Hint 2

Jedno `fetchMany([...new Set(documentIds)])` po unikalnych id, a `apply`
dostaje `documentIds.map((id) => rows[id])` — kolejność i duplikaty wracają
z wejściowej listy, nie z batcha.

## Hint 3

Log buduj z allow-listy pól (`eventId`, liczba dokumentów), nie z całego
`event`. Notatka decyzyjna ma nazywać przyczynę, test regresji (słowo
„retry"), metrykę wdrożenia i warunek rollbacku — nie opisywać diffa.
