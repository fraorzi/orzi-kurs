# Izolacja, blokady i deadlocki

## Kiedy

Gdy równoległe żądania czytają i zmieniają ten sam stan: rezerwacje, kolejki, salda i magazyn.

## Pułapki

Zwykły SELECT nie blokuje; SKIP LOCKED daje niespójny widok; deadlock jest oczekiwanym wynikiem współbieżności i wymaga retry całej transakcji.

## Źródła

- [MySQL 8.4: Transaction isolation](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
- [MySQL 8.4: Locking reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)
- [MySQL 8.4: Deadlocks](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks.html)
