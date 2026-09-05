# Produkcyjna lista klientów przez react-window 2

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `VirtualCustomerList` przez aktualne `react-window@2.2.7`.

- Użyj `List`, nie historycznego `FixedSizeList`.
- Lista ma wysokość 108 px, szerokość 320 px, `rowHeight=36`, `overscanCount=1`,
  `defaultHeight=108`, nazwę `Klienci` i `rowCount=customers.length`.
- Typowany `CustomerRow` przyjmuje `RowComponentProps<CustomerRowProps>`.
- Przenieś `style` i `ariaAttributes` na root wiersza.
- Kliknięcie `Otwórz {name}` wywołuje `onOpen(id)`.
- Ustabilizuj `rowProps` przez `useMemo` zależny od `customers` i `onOpen`.

W DOM ma znajdować się wyłącznie małe okno z 1000 rekordów.
