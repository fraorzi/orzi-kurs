## Hint 1

`pool.execute()` wywołane osobno dla zamówienia i dla każdego itemu może
wypożyczyć inną sesję za każdym razem — na `Pool` nie ma tu żadnej
wspólnej transakcji, choćby wszystkie wywołania stały jedno pod drugim.

## Hint 2

Pobierz `PoolConnection` przez `pool.getConnection()` i rozpocznij
transakcję na tym jednym obiekcie (`connection.beginTransaction()`) —
wszystkie kolejne operacje wykonuj przez `connection`, nie przez `pool`.

## Hint 3

`commit()` dopiero po wszystkich pozycjach; `rollback()` w `catch`;
`connection.release()` w `finally` — bez wyjątków od tej reguły, także
gdy `rollback()` sam rzuci.
