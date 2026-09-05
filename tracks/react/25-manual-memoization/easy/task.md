# Kosztowna kalkulacja niezależna od draftu

Tryb: naprawa. W `starter.tsx` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

Zespół zmierzył, że przekazane `calculateTotal(lines)` jest kosztowne, a ten ekran
działa jeszcze bez React Compilera.

Popraw `PricingPanel` tak, aby kalkulacja wykonywała się przy montowaniu i
po zmianie referencji `lines`, ale nie po wpisywaniu do lokalnego pola `Notatka`.
Użyj `useMemo` z kompletnymi zależnościami.
