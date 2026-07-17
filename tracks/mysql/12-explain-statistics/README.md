# EXPLAIN, statystyki i invisible indexes

## Kiedy

Gdy optymalizujesz na podstawie planu, a nie intuicji, i chcesz bezpiecznie sprawdzić wpływ statystyk lub usunięcia indeksu.

## Pułapki

EXPLAIN bez ANALYZE nie mierzy wykonania; histogram nie jest indeksem; invisible index nadal kosztuje przy zapisie i nadal wymusza UNIQUE.

## Źródła

- [MySQL 8.4: EXPLAIN](https://dev.mysql.com/doc/refman/8.4/en/explain.html)
- [MySQL 8.4: ANALYZE TABLE](https://dev.mysql.com/doc/refman/8.4/en/analyze-table.html)
- [MySQL 8.4: Invisible indexes](https://dev.mysql.com/doc/refman/8.4/en/invisible-indexes.html)
