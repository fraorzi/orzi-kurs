# Projektowanie schematu

## Kiedy

Gdy model ma egzekwować kardynalność, historię i granice domeny przez lata, nie tylko przejść dzisiejszy happy path.

## Pułapki

Sztuczny id nie zastępuje klucza biznesowego; nadmierna normalizacja utrudnia krytyczne odczyty; denormalizowany snapshot wymaga jawnej semantyki czasu.

## Źródła

- [MySQL 8.4: CREATE TABLE](https://dev.mysql.com/doc/refman/8.4/en/create-table.html)
- [MySQL 8.4: Foreign keys](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)
- [MySQL 8.4: InnoDB primary key design](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)
