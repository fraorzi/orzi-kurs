## Hint 1

pool.execute może wypożyczyć inną sesję dla każdej instrukcji.

## Hint 2

Pobierz PoolConnection i rozpocznij transakcję na nim.

## Hint 3

Commit tylko po wszystkich items; rollback w catch; release w finally.
