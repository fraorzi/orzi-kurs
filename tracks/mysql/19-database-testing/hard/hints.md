## Hint 1

ALTER TABLE nie zostanie cofnięty przez testowy rollback.

## Hint 2

Najpierw dodaj nullable i uruchom migrację na istniejących wierszach.

## Hint 3

Dopiero po backfillu ustaw NOT NULL i UNIQUE.
