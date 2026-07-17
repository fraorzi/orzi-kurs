# Transakcje i savepointy

## Kiedy

Gdy jedna operacja biznesowa zmienia kilka rekordów i częściowy sukces uszkodziłby stan.

## Pułapki

Autocommit rozcina operację; błąd zwykle wycofuje tylko instrukcję; DDL wykonuje implicit commit; savepoint nie zastępuje granicy transakcji.

## Źródła

- [MySQL 8.4: START TRANSACTION, COMMIT, ROLLBACK](https://dev.mysql.com/doc/refman/8.4/en/commit.html)
- [MySQL 8.4: SAVEPOINT](https://dev.mysql.com/doc/refman/8.4/en/savepoint.html)
- [MySQL 8.4: InnoDB error handling](https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html)
