## Hint 1

Połącz tekstowo `baseUrl` i target, zamień `\` na `/`, a następnie przejdź po
segmentach rozdzielonych slashem.

## Hint 2

Ignoruj pusty segment i `.`, dla `..` usuń ostatni zapisany segment, a pozostałe
dodawaj do lokalnej tablicy.

## Hint 3

Zwróć nowy obiekt przez `Object.entries` i `Object.fromEntries`. Każdą tablicę targetów
mapuj osobno, aby nie modyfikować danych z tsconfiga.
