## Hint 1

Dwa różne bugi, oba z README: w `makeIndexFns` problemem jest **zakres zmiennej
pętli** (`var` jest funkcyjny — wszystkie callbacki widzą tę samą zmienną),
w `labelTemperature` — **shadowing** (deklaracja w bloku tworzy nową zmienną
zamiast nadpisać zewnętrzną).

## Hint 2

`makeIndexFns`: zamień `var i` na `let i` — `let` w nagłówku `for` tworzy osobną
zmienną dla każdej iteracji, więc każda funkcja domknie własną kopię.
`labelTemperature`: w bloku `if` usuń słowo `let` — zostaw samo przypisanie
`label = "upał"`.
