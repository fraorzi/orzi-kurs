## Hint 1

`Array.prototype.find` z warunkiem na trzy pola naraz — `documentId`,
`locale` i `status` muszą się zgadzać jednocześnie, nie osobno.

## Hint 2

`Number(documentId)` konwertuje ciąg znaków na `NaN`, gdy `documentId` nie
jest liczbą (typowy przypadek) — porównanie do `entry.id` wtedy zawsze
zawiedzie albo, gorzej, czasem trafi przypadkiem.

## Hint 3

Repozytorium testowe celowo ma kilka dokumentów i kilka wersji każdego —
jeśli test przechodzi tylko dzięki temu, że pasujący wpis jest pierwszy w
tablicy, warunek jest za słaby.
