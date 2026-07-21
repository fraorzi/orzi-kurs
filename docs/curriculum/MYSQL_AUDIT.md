# Audyt curriculum MySQL

Data audytu: 2026-07-21. Branch: `feature/curriculum-mysql` (quality pass).
Cel: MySQL 8.4 LTS; weryfikacja na 8.4.10 i `mysql2@3.23.1`.

## Wniosek

Pierwsza wersja tracka miała właściwy zakres (22 tematy + 2 moduły, 68 zadań),
dobre rozwiązania wzorcowe i mocny fundament harnessu (prawdziwa baza,
izolowany schemat per test), ale warstwę dydaktyczną poniżej standardu repo:
64 z 68 testów miało pojedyncze `it`, README ~13 linii, task.md 1–2 zdania,
"moduły" były jednoplikowe. Quality pass zachował rozwiązania (zero zmian
w `_solution.*`) i przepisał warstwę dydaktyczną w całości.

## Zakres quality passu

- **README 22 tematów**: model mentalny z przykładami decyzji, "Kiedy używać /
  Kiedy unikać / Pułapki / Źródła" z linkami do dev.mysql.com/doc/refman/8.4.
- **Testy**: 3–5 nazwanych testów zachowania per zadanie, każdy z własną
  izolowaną bazą. Bramki wymuszają sedno tematów: ON vs WHERE w LEFT JOIN,
  trójwartościowa logika CHECK+NULL, widoczność MVCC dwoma połączeniami,
  deadlock z retry (asymetryczny, stabilny 3×), keyset vs OFFSET na remisach,
  sargowalność i invisible indexes przez EXPLAIN, saturacja globalnej
  `events_statements_summary_by_digest` (TRUNCATE + filtr `SCHEMA_NAME =
  DATABASE()` — stare testy padły na tym w praktyce), injection przez apostrof
  w mysql2, wyciek połączeń z puli.
- **Hinty**: 3 progresywne, specyficzne, unikalne per zadanie (pilnowane
  kontraktem).
- **Moduły wieloplikowe**: `module-01` (schema z constraints → migracja online
  INSTANT/INPLACE z ledgerem → indeks keyset → procedura zakupu z FOR UPDATE
  i wyścigiem o ostatnią sztukę) oraz `module-02` (MarketplaceRepository na
  mysql2: prepared statements, transakcja, polityka retry 1213/1205, metryki
  bez PII, kontrola zwrotów do puli). Wymagało to poprawki runnera
  (`errorOnUnmatchedPattern`) dla katalogów `src/` bez plików lintowalnych.
- **Kontrakt treści** (`harness/mysql-content.test.ts`): sekcje i minimalna
  objętość README, ≥3 testy (≥6 dla modułów), ≥3 hinty, unikalność hints.md,
  znaczniki `[quality]` w 21b.
- **Setup ucznia**: `tracks/mysql/README.md` — instalacja mysql@8.4 (brew),
  wariant usługi i wariant jednorazowej instancji, `ORZI_MYSQL_URL`.

## Decyzje

- Testy współbieżności używają dwóch połączeń z krótkim
  `innodb_lock_wait_timeout` i asercji o skutkach (kody błędów, zachowana
  suma zapasu) — nigdy pomiarów czasu.
- Zadanie [O] `21b`: poprawność zielona na starterze, `[quality]` przez
  EXPLAIN (access type, użyty indeks, progi rows) czerwone na starterze.
- Użytkownicy/role (17) są globalne dla instancji: nazwy losowe per test
  i sprzątanie w finally; introspekcja przez `mysql.role_edges` /
  `information_schema` zamiast parsowania SHOW GRANTS.
- `decimalNumbers: false` w adapterze: DECIMAL/agregaty przychodzą jako
  stringi — asercje odzwierciedlają realny kontrakt drivera.
- `mysql2` jest przypięte do 3.23.1; patch naprawia limit dekompresji pakietu
  oraz obsługę `typeCast` dla wartości `NULL` w protokole binarnym.

## Macierz końcowa

- `verify:solutions mysql`: 68/68, `verify:starters mysql`: 68/68
  (MySQL 8.4.10, izolowane bazy, czysta instancja po przebiegu),
- harness repo: 67/67, root lint i `tsc --noEmit` czyste,
- kontrakt treści: 4/4.

## Źródła bazowe

- [MySQL 8.4 Reference Manual](https://dev.mysql.com/doc/refman/8.4/en/)
- [InnoDB locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)
- [EXPLAIN output](https://dev.mysql.com/doc/refman/8.4/en/explain-output.html)
- [Performance Schema statement digests](https://dev.mysql.com/doc/refman/8.4/en/performance-schema-statement-digests.html)
- [Online DDL operations](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-operations.html)
- [mysql2](https://sidorares.github.io/node-mysql2/docs)
- [mysql2 3.23.0...3.23.1](https://github.com/sidorares/node-mysql2/compare/v3.23.0...v3.23.1)
