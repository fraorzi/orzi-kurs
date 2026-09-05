# Hard [O] - usuń koszt rosnącego OFFSET

Tryb: optymalizacja. Popraw istniejący kod w `starter.sql`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Paginacja logów używa `LIMIT 10 OFFSET 500`. Wynik (strona 51, wiersze
501-510) jest poprawny, ale koszt `OFFSET` rośnie liniowo z jego
wartością: silnik musi policzyć i odrzucić 500 wcześniejszych wierszy,
zanim zwróci pierwszy, który faktycznie trafi do wyniku. Strona 500
kosztuje pięćdziesiąt razy więcej niż strona 10, mimo że obie zwracają
tyle samo wierszy.

Przepisz `starter.sql` na paginację **keyset** (cursor-based) tak, aby:

- zwracał ten sam zestaw `id` co oryginalne zapytanie dla tej strony,
- zamiast `OFFSET` używał `WHERE id > 500` - ostatniego `id` z
  poprzedniej strony jako dolnej granicy,
- zachował `ORDER BY id` i `LIMIT 10` z oryginału,
- zwracał mniej niż 10 wierszy bez błędu, gdy dostępnych wierszy powyżej
  cursora jest mniej niż limit (ostatnia strona).

Ten temat ocenia **dwie osobne bramki**: testy poprawności (bez
oznaczenia) muszą przechodzić już na starterze - wynik startera jest
poprawny. Testy `[quality]` mają na starterze oblewać i przejść dopiero
po zmianie; dowód opiera się na tekście zapytania (brak `OFFSET`) i na
`EXPLAIN` (`type = range` po `PRIMARY`, `Extra` zawiera `Using where`),
nigdy na pomiarze czasu.
