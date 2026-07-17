# Transakcyjna warstwa danych

## Kontekst

Use case zapisuje zamówienie i pozycje przez mysql2; deadlock może wymagać ponowienia całej transakcji, nie pojedynczego INSERT.

## Decyzje

Callback transakcyjny jest idempotentny względem zewnętrznych efektów, rollback poprzedza retry, a tylko deadlock jest ponawiany.

## Źródła

- [Dokumentacja](https://sidorares.github.io/node-mysql2/docs)
- [Dokumentacja](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html)

