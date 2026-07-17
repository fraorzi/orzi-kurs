## Hint 1

`memo` porównuje prop `onExport` przez `Object.is`; nowa funkcja łamie optymalizację.

## Hint 2

Utwórz `handleExport` przez `useCallback` i przekaż go bezpośrednio do potomka.

## Hint 3

Callback czyta `reportId` oraz `onExport`, więc obie wartości należą do tablicy
zależności. Nie naprawiaj wydajności przez pozostawienie starego ID w closure.

