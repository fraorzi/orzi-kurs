# Performance Schema i diagnoza obciążenia

MySQL nie loguje żadnego zapytania z sensownym narzutem produkcyjnym z
automatu — do tego istnieje Performance Schema: instrumentacja wbudowana
w serwer, włączona domyślnie, agregująca zdarzenia w pamięci zamiast pisać
każde wykonanie na dysk. Dwa filary tego tematu: digest zapytań (co jest
drogie) i lock waits (kto na kogo czeka).

**Statement digest** normalizuje tekst zapytania — zamienia literały na
`?`, usuwa różnice w białych znakach — i agreguje wszystkie wykonania tego
samego "kształtu" w jeden wiersz
`performance_schema.events_statements_summary_by_digest`: `COUNT_STAR`
(ile razy), `SUM_TIMER_WAIT`/`AVG_TIMER_WAIT` (czas w **pikosekundach**,
nie milisekundach), `SUM_ROWS_EXAMINED` (ile wierszy silnik dotknął
łącznie). To odpowiedź na "która KLASA zapytań kosztuje najwięcej", nie
"które pojedyncze wywołanie było wolne" — do tego drugiego służy
`events_statements_history` albo slow log.

**Tabela digest jest jedna na całą instancję**, dzielona przez wszystkie
schematy i wszystkie połączenia — nie ma jej kopii per baza. Ma też stały
rozmiar (`@@performance_schema_digest_size`, typowo 10000 wierszy); gdy się
zapełni, nowe unikalne kombinacje `(SCHEMA_NAME, DIGEST)` trafiają do
wspólnego wiersza przepełnienia z `DIGEST_TEXT IS NULL` zamiast dostać
własny wiersz. Dwie konsekwencje dla pomiaru: filtruj zawsze `WHERE
SCHEMA_NAME = DATABASE()` (inaczej zobaczysz zapytania z cudzych baz na tej
samej instancji), a przed pomiarem świeżego obciążenia rozważ `TRUNCATE
TABLE performance_schema.events_statements_summary_by_digest` — bez tego
tabela zapełniona danymi z tysięcy wcześniejszych uruchomień może nie mieć
miejsca na nowy digest Twojego pomiaru, i zapytanie cicho zwróci zero
wierszy zamiast błędu.

**data_lock_waits** to inny mechanizm: tabela transient, nieagregująca —
pokazuje **aktualnie** trwające oczekiwania na blokadę InnoDB i znika, gdy
blokada się rozwiąże (`COMMIT`/`ROLLBACK` blokującej transakcji). Łączy się
z `data_locks` przez `ENGINE_LOCK_ID` i `ENGINE`: `REQUESTING_*` to strona
czekająca, `BLOCKING_*` to strona trzymająca blokadę — pomylenie tych dwóch
odwraca cały raport "kto na kogo czeka".

## Kiedy używać

- `events_statements_summary_by_digest` do znalezienia, która klasa
  zapytań zużywa najwięcej łącznego czasu instancji — punkt startowy
  każdej sesji "dlaczego baza jest wolna".
- `data_lock_waits`/`data_locks`, gdy transakcje czekają na siebie
  nawzajem i trzeba ustalić, którą sesję zabić albo który indeks zmienić,
  by skrócić czas trzymania blokady.
- `sys.statement_analysis`/`sys.statements_with_full_table_scans` do
  szybkiej triage bez ręcznego liczenia z surowych tabel performance_schema.

## Kiedy unikać

- Nie mierz kosztu jednego zapytania przez digest — agreguje wszystkie
  wykonania danego kształtu; do pojedynczego wolnego wywołania sięgnij po
  `events_statements_current`/`events_statements_history` albo slow log.
- Nie włączaj slow query log na produkcji bez ograniczonego okna czasu
  i jasnego celu — koszt I/O logowania i ryzyko zapisania danych
  z zapytań w pliku logu są realne.
- Nie porównuj `SUM_TIMER_WAIT` między różnymi oknami bez `TRUNCATE`
  albo restartu jako punktu odniesienia — to licznik narastający od
  ostatniego zerowania, nie znormalizowana metryka.

## Pułapki

- Czas w performance_schema jest w **pikosekundach** (`SUM_TIMER_WAIT`,
  `AVG_TIMER_WAIT`) — dzielenie przez 1000 zamiast przez 10^12/10^9 daje
  liczby błędne o kilka rzędów wielkości.
- Tabela digest jest globalna i ma limit wierszy — pełna tabela cicho
  gubi nowe digesty w zbiorczym wierszu `DIGEST_TEXT IS NULL` zamiast
  rzucić błąd; symptom to "mój raport nagle widzi zero wierszy" bez
  żadnego komunikatu.
- `SCHEMA_NAME = DATABASE()` musi być w każdym zapytaniu do digestu, które
  ma dotyczyć jednej bazy — bez tego filtru zobaczysz zapytania z każdej
  bazy na instancji, łącznie z cudzymi.
- W `data_lock_waits` `REQUESTING_THREAD_ID` to **czekający**,
  `BLOCKING_THREAD_ID` to **blokujący** — kolumny `data_locks`
  (`ENGINE_LOCK_ID`) trzeba łączyć po właściwej stronie
  (`REQUESTING_ENGINE_LOCK_ID` vs `BLOCKING_ENGINE_LOCK_ID`); pomylenie
  odwraca cały raport.
- Slow query log ma koszt (I/O) i ryzyko: zapisuje pełny tekst zapytania,
  łącznie z danymi w literałach — włączenie go bez planu wyłączenia
  i bez `long_query_time` dopasowanego do kontekstu zaleje dysk albo
  złamie zgodność z regulacjami dotyczącymi danych.

## Runbook: slow log i sys

Najpierw sprawdź `@@slow_query_log`, `@@long_query_time` i miejsce
docelowe logu. Włączenie slow logu jest decyzją operacyjną: ustaw
ograniczony czas obserwacji, chroń log jak dane produkcyjne i po diagnozie
przywróć konfigurację. Do szybkiej triage bez parsowania pliku użyj m.in.
`sys.statement_analysis` oraz `sys.statements_with_full_table_scans`;
wynik potwierdź następnie przez `EXPLAIN ANALYZE` na reprezentatywnych
danych.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Statement Digests](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-statement-digests.html)
- [data_lock_waits Table](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-data-lock-waits-table.html)
- [Query Profiling Using Performance Schema](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-query-profiling.html)
- [The Slow Query Log](https://dev.mysql.com/doc/refman/8.4/en/slow-query-log.html)
- [MySQL sys Schema](https://dev.mysql.com/doc/refman/8.4/en/sys-schema.html)
- [performance_schema_digest_size](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-system-variables.html#sysvar_performance_schema_digest_size)
