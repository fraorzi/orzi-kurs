## Hint 1

Problem to nadmiar, nie brak: starter zwraca każdy hook. Musisz zwinąć hooki
należące do tej samej logicznej operacji na tym samym dokumencie.

## Hint 2

Kluczem deduplikacji jest para `operationId` + `documentId` — nie sam
`documentId` (bo różne operacje na tym dokumencie mają zostać osobno).

## Hint 3

`Map` zachowuje kolejność wstawienia. Wpisuj pod kluczem `` `${operationId}:${documentId}` ``,
a zwróć jego wartości (`documentId`) — pierwsze wystąpienie ustala pozycję.
