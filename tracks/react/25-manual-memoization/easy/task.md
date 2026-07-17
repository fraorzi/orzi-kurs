# Kosztowna kalkulacja niezależna od draftu

Zespół zmierzył, że przekazane `calculateTotal(lines)` jest kosztowne, a ten ekran
działa jeszcze bez React Compilera.

Zaimplementuj `PricingPanel` tak, aby kalkulacja wykonywała się przy montowaniu i
po zmianie referencji `lines`, ale nie po wpisywaniu do lokalnego pola `Notatka`.
Użyj `useMemo` z kompletnymi zależnościami.

