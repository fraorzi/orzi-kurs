## Hint 1

Sprawdź render po przekazaniu nowych `items`. Która wartość nadal pochodzi
z pierwszego renderu?

## Hint 2

Inicjalizator `useState` nie przelicza sumy po zmianie propsów. Ta wartość jest
w całości wyliczana z `items`.

## Hint 3

Usuń stan sumy i import `useState`. Istniejące `items.reduce(...)` przypisz do
`totalCents` w ciele komponentu. Formatowanie wyniku jest już gotowe.
