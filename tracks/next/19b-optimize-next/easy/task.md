# [O] Zwęź client bundle dashboardu

Tryb: optymalizacja. Popraw istniejący kod w `src`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Dashboard działa, ale dyrektywa `"use client"` na komponencie strony wciąga do
client graph także ciężki, nieinteraktywny `AnalyticsChart`.

Usuń dyrektywę z `Dashboard.tsx` i umieść ją wyłącznie w `Filters.tsx`, który używa
stanu. Zachowaj UI i interakcję. Bramka jakości szacuje ciężar client graph: chart
to 90 jednostek, filtry 5; budżet wynosi 10.
