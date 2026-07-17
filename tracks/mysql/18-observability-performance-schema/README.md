# Performance Schema i diagnoza obciążenia

## Kiedy

Gdy potrzebujesz odpowiedzieć, które klasy zapytań zużywają czas oraz kto blokuje konkretną transakcję.

## Pułapki

Digest agreguje podobne instrukcje; czasy są w pikosekundach; slow log ma koszt i ryzyko danych; snapshot locków znika po COMMIT.

## Źródła

- [MySQL 8.4: Statement digests](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-statement-digests.html)
- [MySQL 8.4: data_lock_waits](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-data-lock-waits-table.html)
- [MySQL 8.4: Query profiling](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-query-profiling.html)
- [MySQL 8.4: slow query log](https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html)
- [MySQL 8.4: sys schema](https://dev.mysql.com/doc/refman/8.4/en/sys-schema.html)

## Runbook: slow log i sys

Najpierw sprawdź `@@slow_query_log`, `@@long_query_time` i miejsce docelowe logu.
Włączenie slow logu jest decyzją operacyjną: ustaw ograniczony czas obserwacji,
chroń log jak dane produkcyjne i po diagnozie przywróć konfigurację. Do szybkiej
triage bez parsowania pliku użyj m.in. `sys.statement_analysis` oraz
`sys.statements_with_full_table_scans`; wynik potwierdź następnie przez
`EXPLAIN ANALYZE` na reprezentatywnych danych.
