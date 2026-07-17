# JOIN i cardinality

## Kiedy

Gdy składasz dane z relacji i musisz świadomie zdecydować, czy brak powiązania usuwa wiersz, zachowuje go czy zwielokrotnia wynik.

## Pułapki

Filtr prawej tabeli w WHERE może zmienić LEFT JOIN w INNER JOIN; relacja 1:N zwielokrotnia lewą stronę; self join wymaga czytelnych aliasów.

## Źródła

- [MySQL 8.4: join](https://dev.mysql.com/doc/refman/8.4/en/join.html)
