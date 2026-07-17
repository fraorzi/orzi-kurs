# Migracje, online DDL i restore drill

## Kiedy

Gdy zmieniasz produkcyjny schemat bez jednoczesnego wyłączenia starej wersji aplikacji i bez wiary w niesprawdzony backup.

## Pułapki

DDL implicit commit; online DDL nadal bierze metadata lock; backup bez próbnego restore nie dowodzi odzyskiwalności; contract wymaga wcześniejszego rollout nowego kodu.

## Źródła

- [MySQL 8.4: Online DDL](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl.html)
- [MySQL 8.4: Online DDL limitations](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-limitations.html)
- [MySQL 8.4: Backup and recovery](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html)
