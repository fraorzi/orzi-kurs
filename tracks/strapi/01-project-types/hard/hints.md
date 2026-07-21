## Hint 1

Zbierz zbiór wszystkich UID z obu wejść naraz (np. `new Set([...keys(schema),
...keys(generated)])`) — inaczej ominiesz UID-y istniejące tylko po jednej
stronie.

## Hint 2

`undefined !== "1"` jest prawdą w JavaScripcie, więc brakujący klucz w
jednym z obiektów naturalnie liczy się jako różnica — nie potrzebujesz
osobnej gałęzi na "brakuje".

## Hint 3

Filtruj po nierówności fingerprintów, potem sortuj wynik — sortowanie na
wejściu nic nie da, bo `Set` i tak nie gwarantuje kolejności iteracji między
przeglądarkami tak samo jak w Node, więc porządkuj dopiero na wyjściu.
