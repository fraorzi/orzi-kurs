## Hint 1

`URLSearchParams` z `.set(...)` dla każdego parametru buduje deterministyczny
query string bez ręcznego escapowania — nie sklejaj stringów przez `&`.

## Hint 2

Waliduj `page` przez `Number.isInteger(page) && page >= 1` **przed**
budowaniem czegokolwiek — nieprawidłowa strona nie powinna zwrócić
częściowo zbudowanego stringa.

## Hint 3

Test HTTP wysyła zbudowany string jako prawdziwy query jednego żądania —
jeśli klucz ma literówkę albo brakuje `[0]`/`[1]`, dopiero tu to wyjdzie,
inaczej niż w teście na samym stringu.
