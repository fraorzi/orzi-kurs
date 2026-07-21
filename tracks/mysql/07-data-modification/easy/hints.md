## Hint 1

Starter podaje `NULL` wprost dla `created_at` — przy rygorystycznym
`sql_mode` to narusza `NOT NULL`, bo jawny `NULL` nie uruchamia `DEFAULT`.

## Hint 2

Rozwiązanie: jawna lista kolumn w `INSERT`, a `created_at` po prostu
pomiń — pominięta kolumna z `DEFAULT` dostaje wartość z definicji tabeli.

## Hint 3

Kształt: `INSERT INTO users (id, email) VALUES (1, 'a@example.com')`.
Sprawdź na tabeli z inną kolejnością kolumn w `CREATE TABLE` — jawna lista
kolumn ma dać ten sam wynik niezależnie od schematu.
