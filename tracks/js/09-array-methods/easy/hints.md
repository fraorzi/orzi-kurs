## Hint 1

Wszystko z sekcji „Mutujące podstawy" w README: dostęp po indeksie (`cards[position]`),
`push`, `pop`, `splice`, `length`. Każda funkcja to 1–2 linie.

## Hint 2

`removeItem`: `cards.splice(position, 1)` usuwa jeden element pod indeksem i zwraca
**usunięte elementy** — więc zwróć `cards`, nie wynik splice. `checkSizeOfStack`:
porównaj `cards.length === count`.
