## Hint 1

Covering index oznacza, że wszystkie kolumny potrzebne zapytaniu —
z `SELECT`, `WHERE` i `ORDER BY` — leżą w samym indeksie, więc silnik nie
musi wracać do klastrowanego indeksu po pozostałe dane wiersza.

## Hint 2

Nie zmieniaj kolejności ani nie usuwaj kolumn z zadania medium — `total`
dokładasz na końcu, bo nie filtruje ani nie sortuje, tylko dopełnia
projekcję.

## Hint 3

`CREATE INDEX ix_orders_cover ON orders(tenant_id, status, created_at,
id, total)`. Sprawdź `EXPLAIN SELECT id, total ... FORCE
INDEX(ix_orders_cover) ...` — `Extra` ma zawierać `Using index`; bez
`total` na końcu tego słowa tam nie będzie.
