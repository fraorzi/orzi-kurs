# Agregacje i ONLY_FULL_GROUP_BY

## Kiedy

Gdy tworzysz raporty, liczysz metryki per grupa i potrzebujesz wyniku deterministycznego w domyślnym rygorystycznym sql_mode MySQL 8.4.

## Pułapki

WHERE działa przed grupowaniem, HAVING po; COUNT(*) i COUNT(column) różnią się dla NULL; kolumna spoza GROUP BY musi być zależna funkcyjnie lub agregowana.

## Źródła

- [MySQL 8.4: group-by-functions](https://dev.mysql.com/doc/refman/8.4/en/group-by-functions.html)
- [MySQL 8.4: group-by-handling](https://dev.mysql.com/doc/refman/8.4/en/group-by-handling.html)
