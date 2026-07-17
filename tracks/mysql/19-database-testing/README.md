# Testy bazy danych

## Kiedy

Gdy test ma dowodzić zachowania constraints, transakcji i migracji na rzeczywistym silniku, z deterministycznym setupem oraz cleanupem.

## Pułapki

Współdzielony schemat daje flaky tests; fixture zależna od AUTO_INCREMENT ukrywa kontrakt; rollback nie cofnie DDL; mock nie odtworzy semantyki InnoDB.

## Źródła

- [InnoDB transactions](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)
- [Information Schema COLUMNS](https://dev.mysql.com/doc/refman/8.4/en/information-schema-columns-table.html)
- [Implicit commits](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html)
