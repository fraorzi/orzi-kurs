# [O] Ogranicz cardinality klucza cache

Tryb: optymalizacja. Popraw istniejący kod w `starter.ts`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Cache rekomendacji działa poprawnie, ale używa całego requestu jako klucza.
Techniczne `requestId` powoduje miss przy każdym wywołaniu.

Klucz ma zawierać wyłącznie `tenantId`, `productId` i `currency`, bo te pola
wpływają na wynik. Zachowaj izolację tenantów i waluty. Bramka jakości wymaga jednego
wywołania loadera dla dwóch requestów różniących się tylko `requestId`.
