## Hint 1

Pierwszy widoczny indeks to `floor(scrollTop / rowHeight)`, a koniec widocznego
zakresu to `ceil((scrollTop + viewportHeight) / rowHeight)`.

## Hint 2

`start = max(0, firstVisible - overscan)`, a
`end = min(items.length, visibleEnd + overscan)`.

## Hint 3

Możesz użyć `items.slice(start, end).map((item, offset) => ...)`; rzeczywisty
indeks to `start + offset`.
