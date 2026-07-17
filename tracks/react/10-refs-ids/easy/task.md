# Focus lokalny dla instancji komponentu

Zaimplementuj `FocusField`.

Komponent otrzymuje `label`, renderuje pole o tej nazwie i przycisk
`Ustaw focus: {label}`. Kliknięcie ma fokusować input należący do tej konkretnej
instancji.

Rozwiązanie musi działać, gdy na stronie są co najmniej dwa `FocusField`. Użyj
`useRef`, nie globalnego selektora DOM.
