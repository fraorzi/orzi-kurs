## Hint 1

Zbuduj obiekt błędów i równolegle zapamiętaj nazwę pierwszego niepoprawnego pola.

## Hint 2

Formularz jest dostępny jako `event.currentTarget`. Element po nazwie znajdziesz
przez `form.elements.namedItem(name)`.

## Hint 3

Po zapisaniu błędów sprawdź, czy znaleziony element jest `HTMLElement`, i wywołaj
na nim `focus()`. Callback wywołuj wyłącznie w gałęzi bez błędów.
