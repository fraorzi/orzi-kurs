## Hint 1

Deadlock rollbackuje całą transakcję wybraną jako victim.

## Hint 2

Sprawdź errno 1213/1205 i ogranicz liczbę prób.

## Hint 3

Pętla ma ponownie pobrać connection, begin i wywołać cały work; release pozostaje w finally.
