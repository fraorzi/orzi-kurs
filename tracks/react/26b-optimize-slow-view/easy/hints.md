## Hint 1

Problemem jest to, że stan filtrów i tworzenie elementu raportu znajdują się w tym
samym komponencie.

## Hint 2

Utwórz `ExpandableFilters({ children })`, przenieś do niego `useState`, przycisk i
warunkowy komunikat.

## Hint 3

`AnalyticsPage` może przekazać `<Report ... />` jako już utworzone `children`.
Aktualizacja stanu wewnątrz wrappera zachowa tę samą wartość potomka.

