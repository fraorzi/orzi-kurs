# Focus lokalny dla instancji komponentu

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `FocusField`.

Komponent otrzymuje `label`, renderuje pole o tej nazwie i przycisk
`Ustaw focus: {label}`. Kliknięcie ma fokusować input należący do tej konkretnej
instancji.

Rozwiązanie musi działać, gdy na stronie są co najmniej dwa `FocusField`. Użyj
`useRef`, nie globalnego selektora DOM.
