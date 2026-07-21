## Hint 1

Idź plikami w kolejności wykonywania. `schema.sql`: każdy niezmiennik z
task.md to jeden CHECK/UNIQUE/FK — testy czytają kody błędów
(`ER_CHECK_CONSTRAINT_VIOLATED`, `ER_DUP_ENTRY`, `ER_ROW_IS_REFERENCED_2`),
więc bramka mówi wprost, którego constraintu brakuje.

## Hint 2

`migration.sql`: trzy kroki — `ADD COLUMN ... ALGORITHM=INSTANT`,
`ADD CONSTRAINT ... UNIQUE ... ALGORITHM=INPLACE, LOCK=NONE`, INSERT do
`schema_migrations`. Wersja musi brzmieć dokładnie
`20260717_add_listing_public_id`.

## Hint 3

Wyścig w `place_order`: bez `START TRANSACTION` + `FOR UPDATE` oba wywołania
czytają `stock=1` i oba kupują. Blokada wiersza w transakcji serializuje
sekcję odczyt→zapis; `SLEEP` tylko poszerza okno, żeby test był stabilny.

## Hint 4

`EXIT HANDLER FOR SQLEXCEPTION` z `ROLLBACK; RESIGNAL;` sprząta częściowe
INSERT-y (test "osierocone wiersze"), a `UPDATE ... SET stock = stock - p_quantity`
zamiast `available - p_quantity` nie cofa cudzych zakupów.
