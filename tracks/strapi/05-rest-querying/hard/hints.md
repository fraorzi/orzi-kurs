## Hint 1

`Math.ceil(total / pageSize)` przewidziany dla `total > 0`; osobno
obsłuż `total === 0` → oczekiwany `pageCount` to `0`, nie `NaN` ani `1`.

## Hint 2

Cztery niezależne warunki błędu, jeden wspólny komunikat — połącz je przez
`||` w jednym `if`, zamiast czterech osobnych rzutów, żeby nie zdublować
tekstu błędu.

## Hint 3

`pageCount > 0 && page > pageCount` — dopiero ta koniunkcja poprawnie
przepuszcza `page: 1, pageCount: 0` (brak wyników) i jednocześnie łapie
`page` faktycznie poza zakresem istniejących stron.
