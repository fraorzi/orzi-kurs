## Hint 1

Backup staje się wiarygodny dopiero po realnym restore i weryfikacji, nie
po samym `mysqldump`.

## Hint 2

Dla zgodnej operacji wymuś `ALGORITHM=INSTANT`, żeby nie dopuścić cichego
`COPY` blokującego tabelę na czas zmiany.

## Hint 3

Zapisz identyfikator migracji do `schema_migrations` dopiero po udanym
`ALTER` i udokumentuj komendy preflight w komentarzach nad skryptem.
