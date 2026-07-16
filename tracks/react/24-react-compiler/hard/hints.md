## Hint 1

Ref nie służy do cache'owania danych wykorzystywanych w renderze. Taki cache łatwo
pomija jedną z zależności i uzależnia poprawność od referencji.

## Hint 2

Wynik może być zwykłym `items.filter(...)` obliczonym z `items` i `query` w każdym
renderze źródłowym. Compiler zdecyduje, co zapamiętać.

## Hint 3

Po naprawie usuń `"use no memo"`. Test uruchamia prawdziwy plugin i wymaga, aby
`SearchResults` nie był już pomijany.

