# Debugowanie incydentów danych

## Kiedy

Gdy raport gubi rekordy, równoległe żądania nadpisują stan albo migracja zatrzymuje się na danych historycznych.

## Pułapki

Naprawa objawu bez reprodukcji tworzy regresję; WHERE może zmienić LEFT JOIN w inner; read-modify-write gubi aktualizacje; DDL nie cofa się jak DML.

## Źródła

- [MySQL 8.4: Join optimization](https://dev.mysql.com/doc/refman/8.4/en/nested-join-optimization.html)
- [MySQL 8.4: InnoDB locking reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)
- [MySQL 8.4: ALTER TABLE](https://dev.mysql.com/doc/refman/8.4/en/alter-table.html)
