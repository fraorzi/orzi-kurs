## Hint 1

Reducer startera zwraca `state` bez zmian. Rozpisz `switch (action.type)`
na `add`/`remove`/`reset`, a w `default` zwróć `action satisfies never` —
to wymusi obsługę wszystkich wariantów unii.

## Hint 2

Clamp na zero w dwóch miejscach: `Math.max(0, amount)` chroni przed ujemnym
wejściem, `Math.max(0, count - amount)` chroni przed ujemnym stanem.

## Hint 3

`useCart` startera cicho zwraca fallback `{ count: 0 }` — zamień na odczyt
Contextu i `throw new Error("useCart wymaga CartProvider")`, gdy wartość
jest `null`. Cichy fallback ukrywa błąd braku Providera.
