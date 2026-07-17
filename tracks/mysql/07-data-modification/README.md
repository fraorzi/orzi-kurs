# Bezpieczne modyfikowanie danych

## Kiedy

Gdy zapisujesz komendy domenowe, synchronizujesz dane i musisz rozumieć atomowość pojedynczego statementu, affected rows oraz skutki ponowienia.

## Pułapki

UPDATE/DELETE bez zawężonego WHERE zmienia cały zbiór; upsert ma semantykę konfliktu konkretnego unique key; wiele statementów wymaga transakcji.

## Źródła

- [MySQL 8.4: insert](https://dev.mysql.com/doc/refman/8.4/en/insert.html)
- [MySQL 8.4: update](https://dev.mysql.com/doc/refman/8.4/en/update.html)
- [MySQL 8.4: delete](https://dev.mysql.com/doc/refman/8.4/en/delete.html)
- [MySQL 8.4: insert-on-duplicate](https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html)
