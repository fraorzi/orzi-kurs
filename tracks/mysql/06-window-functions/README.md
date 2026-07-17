# Funkcje okienkowe

## Kiedy

Gdy potrzebujesz rankingu, porównania z poprzednim wierszem albo kumulacji bez zwijania wyniku do jednego wiersza na grupę.

## Pułapki

ORDER BY wewnątrz OVER nie sortuje wyniku końcowego; ROW_NUMBER i RANK inaczej traktują remisy; domyślna rama RANGE może objąć peer rows.

## Źródła

- [MySQL 8.4: window-functions](https://dev.mysql.com/doc/refman/8.4/en/window-functions.html)
- [MySQL 8.4: window-function-frames](https://dev.mysql.com/doc/refman/8.4/en/window-function-frames.html)
