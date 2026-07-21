## Hint 1

Status jest encją referencyjną — skończonym, nazwanym zbiorem wartości —
nie dowolnym tekstem. Modeluj go jak każdą inną tabelę słownikową.

## Hint 2

FK opisuje osobno `ON UPDATE` i `ON DELETE` — to nie muszą być te same
akcje.

## Hint 3

`ON UPDATE CASCADE` (rename kodu propaguje się do ticketów), `ON DELETE
RESTRICT` (użyty status blokuje `DELETE`, nieużywany — nie).
