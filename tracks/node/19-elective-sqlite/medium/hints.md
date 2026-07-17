## Hint 1

Kształt: walidacja → `BEGIN IMMEDIATE` → `try { debet; kredyt; COMMIT }
catch { ROLLBACK; throw }`.

## Hint 2

Warunek środków to część SQL debetu (`AND balance >= ?`), a sygnałem
niepowodzenia jest `changes !== 1` — nie osobny SELECT.

## Hint 3

`IMMEDIATE` bierze lock zapisu na starcie — konflikt współbieżności
objawia się na BEGIN, nie w połowie przelewu.
