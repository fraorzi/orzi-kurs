## Hint 1

Obiekt `options` tworzony w ciele komponentu ma nową referencję przy każdej zmianie
lokalnego tytułu.

## Hint 2

Użyj `useMemo(() => ({ currency, series }), [currency, series])`.

## Hint 3

Effect powinien zależeć od stabilnego `options` oraz przekazanej funkcji
`connectChart` i bezpośrednio zwracać otrzymany cleanup.

