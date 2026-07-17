# [O] Ogranicz cardinality klucza cache

Cache rekomendacji działa poprawnie, ale używa całego requestu jako klucza.
Techniczne `requestId` powoduje miss przy każdym wywołaniu.

Klucz ma zawierać wyłącznie `tenantId`, `productId` i `currency`, bo te pola
wpływają na wynik. Zachowaj izolację tenantów i waluty. Bramka jakości wymaga jednego
wywołania loadera dla dwóch requestów różniących się tylko `requestId`.
