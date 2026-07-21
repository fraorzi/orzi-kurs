## Hint 1

`information_schema.processlist` pokazuje chwilę obecną, nie historię
wykonań — do agregacji klas zapytań służy
`performance_schema.events_statements_summary_by_digest`.

## Hint 2

Filtruj `WHERE SCHEMA_NAME = DATABASE() AND DIGEST_TEXT IS NOT NULL` —
tabela jest globalna dla instancji, więc bez filtru po schemacie zobaczysz
też zapytania z innych baz.

## Hint 3

`SUM_TIMER_WAIT` jest w pikosekundach — podziel przez `1000000000000`
(10^12), żeby dostać sekundy. Sortuj `ORDER BY SUM_TIMER_WAIT DESC LIMIT
10`.
