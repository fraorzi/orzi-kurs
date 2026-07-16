## Hint 1

Mapped tuple: `{ -readonly [K in keyof Values]: ... }`.

## Hint 2

Typ pozycji to `Awaited<Values[K]>`.

## Hint 3

`Promise.all(values)` ma właściwe zachowanie; potrzebne jest lokalne rzutowanie wyniku.
