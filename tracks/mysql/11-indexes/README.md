# Indeksy B-tree

## Kiedy

Gdy znasz rzeczywisty kształt zapytania i chcesz ograniczyć odczyty bez nadmiernego kosztu zapisu.

## Pułapki

Indeks na każdą kolumnę spowalnia DML; kolejność kolumn wynika z filtrów i sortowania; leftmost prefix ogranicza użyteczne prefiksy.

## Źródła

- [MySQL 8.4: How MySQL uses indexes](https://dev.mysql.com/doc/refman/8.4/en/mysql-indexes.html)
- [MySQL 8.4: Multiple-column indexes](https://dev.mysql.com/doc/refman/8.4/en/multiple-column-indexes.html)
- [MySQL 8.4: Verifying index usage](https://dev.mysql.com/doc/refman/8.4/en/verifying-index-usage.html)
