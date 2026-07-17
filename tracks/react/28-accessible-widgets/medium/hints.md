## Hint 1

Utrzymuj osobno `selectedIndex` i `focusedIndex`; manual activation rozróżnia te
dwa stany.

## Hint 2

Zachowaj taby w tablicy refów. Po ArrowRight/ArrowLeft oblicz indeks modulo długość
i wywołaj `.focus()` na odpowiednim przycisku.

## Hint 3

Natywny button aktywuje `onClick` klawiszami Enter i Space. Handler kliknięcia może
ustawić oba indeksy bez osobnej obsługi tych dwóch klawiszy.
