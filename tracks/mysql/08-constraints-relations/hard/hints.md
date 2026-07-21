## Hint 1

Starter ma globalny `UNIQUE(slug)` — blokuje poprawny scenariusz (dwóch
różnych tenantów z tym samym slugiem), zamiast blokować tylko duplikat
w obrębie jednego tenanta.

## Hint 2

Unikalność i klucz główny muszą obejmować `tenant_id`: `UNIQUE
(tenant_id, slug)` zamiast `UNIQUE(slug)`, `PRIMARY KEY (tenant_id, id)`
zamiast samego `id`. Klucz obcy z `tasks` też musi przenosić `tenant_id`
— `FOREIGN KEY (tenant_id, project_id) REFERENCES projects(tenant_id,
id)`, nie sam `project_id`.

## Hint 3

`projects` potrzebuje `PRIMARY KEY (tenant_id, id)` i osobno `UNIQUE KEY
(tenant_id, slug)`. `tasks` potrzebuje złożonego `FOREIGN KEY (tenant_id,
project_id) REFERENCES projects(tenant_id, id)`. Sprawdź: ten sam `slug`
w dwóch tenantach przechodzi, ten sam slug dwa razy w jednym tenancie
daje `ER_DUP_ENTRY`, zadanie w cudzym tenancie daje
`ER_NO_REFERENCED_ROW_2`.
