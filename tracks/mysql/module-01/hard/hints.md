## Hint 1

Najpierw zakoduj invariants w DDL; aplikacja nie jest jedynym klientem danych.

## Hint 2

Ostatnią sztukę zabezpiecza SELECT ... FOR UPDATE wewnątrz tej samej transakcji co order i stock update.

## Hint 3

Indeks feedu zaczyna się od seller_id, a migracja ma ledger i jawny ALGORITHM/LOCK.
