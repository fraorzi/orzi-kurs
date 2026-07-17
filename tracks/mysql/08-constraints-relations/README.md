# Constraints i relacje

## Kiedy

Gdy niezmiennik musi obowiązywać niezależnie od aplikacji, importu danych i przyszłego klienta bazy.

## Pułapki

Typ w aplikacji nie chroni bazy; NULL omija część CHECK/UNIQUE semantyki; cascade może usunąć duży graf danych.

## Źródła

- [MySQL 8.4: constraints](https://dev.mysql.com/doc/refman/8.4/en/constraints.html)
- [MySQL 8.4: create-table-foreign-keys](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)
- [MySQL 8.4: create-table-check-constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html)
