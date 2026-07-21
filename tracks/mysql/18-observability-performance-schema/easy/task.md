# Easy — zgrupuj obciążenie po statement digest

Dashboard "dlaczego baza jest wolna" ma odpowiedzieć jednym zapytaniem:
które KLASY zapytań w bieżącym schemacie zużywają najwięcej łącznego
czasu, nie tylko które pojedyncze wywołanie akurat trwało długo.
`information_schema.processlist` pokazuje tylko to, co dzieje się TERAZ —
do agregacji historii wykonań służy `performance_schema.events_statements_summary_by_digest`.

Napisz zapytanie, które zwraca dziesięć najkosztowniejszych digestów
bieżącego schematu z kolumnami `digest`, `executions`, `total_seconds`
i `rows_examined`:

- ogranicz wynik do bieżącej bazy (`SCHEMA_NAME = DATABASE()`) — tabela
  digest jest globalna dla całej instancji i bez tego filtru zobaczysz
  zapytania z cudzych schematów,
- pomiń wiersz przepełnienia (`DIGEST_TEXT IS NULL`), który pojawia się,
  gdy tabela digest osiągnie limit rozmiaru,
- `total_seconds` przelicz z pikosekund (`SUM_TIMER_WAIT` jest w
  pikosekundach, nie milisekundach),
- posortuj malejąco po całkowitym czasie i ogranicz do 10 wierszy.

Różne wartości literałów w tym samym kształcie zapytania (`WHERE x = 1`
i `WHERE x = 2`) mają trafić do jednego digestu — digest normalizuje
literały, nie tekst zapytania dosłownie.
