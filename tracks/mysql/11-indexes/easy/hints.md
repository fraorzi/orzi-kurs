## Hint 1

Starter indeksuje inną kolumnę (`created_at`) niż ta, po której realnie
filtruje zapytanie z zadania — indeks, który nie zaczyna się od kolumny
z `WHERE`, nie przyspiesza tego filtra.

## Hint 2

Nazwa indeksu i lista kolumn to część kontraktu: `CREATE INDEX
ix_orders_status ON orders(status)` — dokładnie ta nazwa, dokładnie jedna
kolumna, bez dodatkowych.

## Hint 3

Po utworzeniu sprawdź `EXPLAIN SELECT * FROM orders FORCE
INDEX(ix_orders_status) WHERE status = 'paid'` — `type` ma być `ref`,
nie `ALL`; `key` ma pokazywać `ix_orders_status`.
