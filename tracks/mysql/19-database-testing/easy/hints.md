## Hint 1

Zwykły `INSERT` powtórzony na tych samych `id` kończy się `ER_DUP_ENTRY` —
starter działa tylko raz, na pustej tabeli.

## Hint 2

`INSERT ... ON DUPLICATE KEY UPDATE` pozwala w jednej instrukcji wstawić
brakujące wiersze i naprawić istniejące, bez `DELETE` na starcie — dzięki
temu wiersze spoza zestawu kanonicznego (np. `id = 999` z innego testu)
zostają nietknięte.

## Hint 3

MySQL 8.4: `INSERT INTO users(id, name) VALUES (101,'Ada'),(102,'Grace')
AS incoming ON DUPLICATE KEY UPDATE name = incoming.name` — alias wiersza
(`AS incoming`) daje dostęp do wstawianych wartości w klauzuli `UPDATE`
bez przestarzałego `VALUES(name)`.
