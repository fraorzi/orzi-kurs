## Hint 1

Starter robi zwykły `ROLLBACK` po wpisie telemetrii — to cofa **całą**
transakcję, łącznie ze zmianą zapasu, którą dopiero co zrobiłeś. Potrzebny
jest punkt pośredni, nie pełne wycofanie.

## Hint 2

`SAVEPOINT nazwa` przed opcjonalnym krokiem, `ROLLBACK TO SAVEPOINT nazwa`
zamiast zwykłego `ROLLBACK` — to cofa tylko statementy wykonane po
savepointcie, a transakcja trwa dalej i wciąż wymaga `COMMIT` na końcu.

## Hint 3

Kształt: `SAVEPOINT optional_step; INSERT ... 'telemetry'; ROLLBACK TO
SAVEPOINT optional_step; INSERT ... 'inventory_changed'; COMMIT;`.
Sprawdź: `audit_log` ma zawierać `inventory_changed`, ale nie
`telemetry`, a `quantity` ma spaść dokładnie o 2 względem stanu
początkowego.
