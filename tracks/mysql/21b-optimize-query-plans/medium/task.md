# Medium [O] — usuń correlated aggregate per row

`starter.sql` liczy sumę zamówień klienta przez skorelowane podzapytanie
w liście `SELECT`: `(SELECT SUM(o.total) FROM orders o WHERE
o.customer_id = c.id)`. Wynik jest poprawny, ale plan wykonania uruchamia
to podzapytanie **osobno dla każdego wiersza** `customers` — koszt rośnie
liniowo z liczbą klientów pomnożoną przez koszt pojedynczego podzapytania,
zamiast policzyć wszystko w jednym przebiegu.

Przepisz `starter.sql` tak, aby:

- zwracał ten sam wynik: `id` klienta i sumę `total` jego zamówień,
- klient bez żadnego zamówienia miał `total = 0`, nie `NULL` i nie
  brakujący wiersz,
- agregację wykonywał **jednym** zbiorowym blokiem — `LEFT JOIN` do
  `orders` i `GROUP BY c.id`, bez podzapytania uruchamianego per wiersz,
- zachował porządek rosnąco po `c.id`.

Ten temat ocenia **dwie osobne bramki**: testy poprawności (bez
oznaczenia) muszą przechodzić już na starterze. Testy `[quality]` mają na
starterze oblewać i przejść dopiero po zmianie — dowód opiera się na
tekście zapytania (brak podzapytania w liście `SELECT`) i na
`EXPLAIN FORMAT=JSON` (brak zależnego bloku, `"dependent": true`), nigdy
na pomiarze czasu.
