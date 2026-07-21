## Hint 1

Najpierw zabezpiecz identyczny wynik testem poprawności — dopiero potem
zmieniaj kształt zapytania; przy tym temacie łatwo "zoptymalizować" do
innego wyniku.

## Hint 2

Skorelowane podzapytanie w `SELECT` jest logicznie wykonywane w kontekście
każdego wiersza `customers` z osobna — `EXPLAIN FORMAT=JSON` oznacza taki
blok jako `"dependent": true`.

## Hint 3

`LEFT JOIN orders o ON o.customer_id = c.id`, `GROUP BY c.id` i
`COALESCE(SUM(o.total), 0)` liczą sumę dla wszystkich klientów w jednym
przebiegu — `COALESCE` zamienia `NULL` (brak dopasowania z `LEFT JOIN`)
na `0`.
