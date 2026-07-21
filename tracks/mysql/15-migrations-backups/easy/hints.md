## Hint 1

Najpierw rozszerz schemat kompatybilnie ze starymi danymi — nowa kolumna
jako `NULL`, nikt jeszcze nic nie musi w niej mieć.

## Hint 2

Backfill (`UPDATE ... REGEXP_REPLACE(phone, '[^0-9]', '')`) wykonaj przed
zaostrzeniem kontraktu, nie po nim.

## Hint 3

Dopiero po backfillu dodaj `NOT NULL` i `UNIQUE`. Jeśli backfill ujawni
duplikat po normalizacji, migracja ma się zatrzymać na tym kroku (`ER_DUP_
ENTRY`), nie przejść po cichu.
