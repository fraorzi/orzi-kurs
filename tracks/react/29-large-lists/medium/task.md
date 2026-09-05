# Ręczne okno dla logów o stałej wysokości

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Popraw `VirtualLog` bez biblioteki.

Propsy `rowHeight`, `viewportHeight`, `scrollTop` i `overscan` opisują okno.
Wyznacz zakres przecinający viewport i dodaj overscan z obu stron, przycinając go
do granic tablicy.

- W DOM renderuj tylko ten zakres, nie całą listę.
- Root ma rolę `list`, nazwę `Logi`, wysokość viewportu i `overflowY: "auto"`.
- Wewnętrzny spacer ma wysokość `items.length * rowHeight` i `position: relative`.
- Wiersze mają rolę `listitem`, absolutne `top=index*rowHeight`, wysokość wiersza,
  i tekst odpowiedniego elementu danych.

Koniec zakresu traktuj jako indeks wyłączny.
