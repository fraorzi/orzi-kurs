## Hint 1

Mapped tuple iteruje po `keyof Left`: `{ readonly [K in keyof Left]: ... }`.

## Hint 2

Element prawej strony dla pozycji `K` możesz odczytać jako
`Right[K & keyof Right]`.

## Hint 3

Runtime `map` zwraca zwykłą tablicę, więc po zbudowaniu wszystkich par potrzebne jest
jedno kontrolowane rzutowanie całego wyniku na `Zip<Left, Right>`.
