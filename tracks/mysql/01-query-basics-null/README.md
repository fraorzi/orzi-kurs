# Zapytania, kolejność i NULL

## Kiedy

Gdy odczytujesz dane aplikacyjne i potrzebujesz jednoznacznie określić filtr, projekcję, stabilny porządek oraz zachowanie brakujących wartości.

## Pułapki

`NULL` nie jest równe nawet `NULL`; brak `ORDER BY` nie gwarantuje kolejności; `LIMIT` bez pełnego tie-breakera daje niestabilne strony.

## Źródła

- [MySQL 8.4: select](https://dev.mysql.com/doc/refman/8.4/en/select.html)
- [MySQL 8.4: working-with-null](https://dev.mysql.com/doc/refman/8.4/en/working-with-null.html)
- [MySQL 8.4: order-by-optimization](https://dev.mysql.com/doc/refman/8.4/en/order-by-optimization.html)
