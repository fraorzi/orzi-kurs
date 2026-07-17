# mysql2 i TypeScript

## Kiedy

Gdy kod Node musi parametryzować dane, ograniczać życie połączenia i utrzymywać całą jednostkę biznesową na jednej sesji.

## Pułapki

TypeScript nie waliduje wiersza runtime; pool.execute poza transakcją może użyć różnych sesji; release w złym miejscu wycieka połączenie; retry dotyczy całej transakcji.

## Źródła

- [mysql2 documentation](https://sidorares.github.io/node-mysql2/docs/documentation)
- [mysql2 prepared statements](https://sidorares.github.io/node-mysql2/docs/documentation/prepared-statements)
- [MySQL deadlock handling](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html)
