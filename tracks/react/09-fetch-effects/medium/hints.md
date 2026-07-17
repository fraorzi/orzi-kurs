## Hint 1

Utwórz lokalne `let ignore = false` wewnątrz każdego setupu efektu.

## Hint 2

Cleanup ustawia `ignore = true`, a callbacki obietnicy zapisują stan tylko dla
`ignore === false`.

## Hint 3

Zapisuj query razem z wynikiem. Jeśli nie pasuje do bieżącego propsa, pokazuj pending.
