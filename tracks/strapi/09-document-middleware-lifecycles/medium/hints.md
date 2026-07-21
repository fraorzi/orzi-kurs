## Hint 1

Klucz to string złożony z trzech pól: `` `${documentId}:${action}:${locale}` ``
— dwa zdarzenia o tym samym kluczu są duplikatem tego samego efektu.

## Hint 2

`Set<string>` na widzianych kluczach plus `Array.prototype.filter` daje
deduplikację w jednym przejściu, zachowując kolejność wejścia.

## Hint 3

Nie normalizuj ani nie sortuj `locale` — `"pl"` i `"pl-PL"` to różne,
uprawnione klucze, nie warianty tego samego zdarzenia.
