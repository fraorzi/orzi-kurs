# Ręczne okno dla logów o stałej wysokości

Zaimplementuj `VirtualLog` bez biblioteki.

Propsy `rowHeight`, `viewportHeight`, `scrollTop` i `overscan` opisują okno.
Wyznacz zakres przecinający viewport i dodaj overscan z obu stron, przycinając go
do granic tablicy.

- W DOM renderuj tylko ten zakres, nie całą listę.
- Root ma rolę `list`, nazwę `Logi`, wysokość viewportu i `overflowY: "auto"`.
- Wewnętrzny spacer ma wysokość `items.length * rowHeight` i `position: relative`.
- Wiersze mają rolę `listitem`, absolutne `top=index*rowHeight`, wysokość wiersza,
  `aria-posinset=index+1` i `aria-setsize=items.length`.

Koniec zakresu traktuj jako indeks wyłączny.
