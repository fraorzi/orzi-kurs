# Testy bazy danych

Mock storage engine nie odtworzy semantyki InnoDB: nie wymusi
`FOREIGN KEY`, nie da prawdziwego `ROLLBACK`, nie odtworzy trójwartościowej
logiki `NULL` ani rzeczywistego błędu `ER_DUP_ENTRY` przy złamanym
`UNIQUE`. Testy z tego tematu celowo łączą się z prawdziwym MySQL 8.4 —
`withMySql` tworzy dla każdego wywołania osobną, jednorazową bazę, więc
testy mogą tworzyć tabele, wstawiać dane i sprawdzać realne zachowanie
silnika bez ryzyka kolizji między testami uruchamianymi równolegle.

**Fixture** to dane wejściowe testu. Dobra fixture jest **idempotentna** —
uruchomienie jej drugi raz nie rzuca `ER_DUP_ENTRY` i nie tworzy
duplikatów, tylko odtwarza ten sam kanoniczny stan. `INSERT ... ON
DUPLICATE KEY UPDATE` (albo `REPLACE INTO`, z innym efektem ubocznym dla
`AUTO_INCREMENT` i triggerów) załatwia to bez poleganie na tym, że tabela
zaczyna pusta. Fixture, która zależy od tego, że nikt inny nie wstawił nic
wcześniej, jest fixture, która obleje przy drugim uruchomieniu tego
samego test suite'a.

**Izolacja przez transakcję** to szybszy odpowiednik "stwórz nową bazę na
każdy test": otwórz transakcję przed testem, wykonaj operacje, cofnij ją
w `finally` — niezależnie od tego, czy test zakończył się sukcesem, czy
wyjątkiem. Kluczowy błąd to `COMMIT` na happy path "bo przecież
zadziałało" — dane testowe zostają w bazie i zanieczyszczają kolejne testy
albo kolejne uruchomienie tego samego testu.

**Testowanie migracji** ma inny reżim: `ALTER TABLE`, `CREATE`/`DROP` i
większość DDL w MySQL wykonuje **niejawny COMMIT** przed i po instrukcji
(`implicit commit`) — owijanie migracji w transakcję i robienie
`ROLLBACK` na końcu testu **nie cofnie** zmiany schematu, tylko dane
wstawione poza DDL. Test migracji na danych legacy powinien: (1) dodać
kolumnę jako `NULL`, (2) backfillować istniejące wiersze, (3) dopiero
potem zaostrzyć do `NOT NULL`/`UNIQUE` — odwrócenie kolejności złamie
istniejące, jeszcze niepoprawione wiersze w kroku 3.

## Kiedy używać

- Prawdziwego MySQL w testach integracyjnych zawsze, gdy test dowodzi
  zachowania specyficznego dla silnika: `UNIQUE`, `FOREIGN KEY`,
  `NOT NULL`, kolejność wykonania triggerów, poziomy izolacji transakcji.
- Rollbacku jako izolacji testu, gdy operacje mieszczą się w jednej
  transakcji i nie zawierają DDL — szybsze niż tworzenie nowej bazy per
  test, wciąż w pełni izolowane.
- Osobnej, jednorazowej bazy (`withMySql`) zamiast współdzielonego
  schematu, gdy testy mogą uruchamiać się równolegle albo test zawiera
  DDL, którego rollback nie cofnie.

## Kiedy unikać

- Nie testuj logiki czysto biznesowej (bez zapytań SQL) przez prawdziwą
  bazę — mock/fake dla samej logiki jest szybszy i prostszy w utrzymaniu;
  prawdziwa baza jest dla zachowania SQL/silnika, nie dla całej aplikacji.
- Nie buduj fixture przez `DELETE FROM table` + surowy `INSERT` jako
  domyślnego wzorca — usuwa też dane spoza zakresu fixture, które inny
  test mógł tam zostawić celowo.
- Nie polegaj na konkretnych wartościach `AUTO_INCREMENT` w asercjach —
  są zależne od kolejności wykonania testów i historii tabeli, nie od
  logiki, którą test ma dowodzić.

## Pułapki

- Współdzielony schemat między testami daje flaky testy: kolejność
  wykonania zaczyna mieć znaczenie, mimo że testy z założenia miały być
  niezależne.
- `ROLLBACK` nie cofnie DDL (`ALTER TABLE`, `CREATE TABLE`) — MySQL robi
  niejawny `COMMIT` wokół tych instrukcji; test migracji potrzebuje
  osobnej bazy albo jawnego sprzątania po sobie, nie transakcji.
- Fixture zależna od aktualnej wartości `AUTO_INCREMENT` ukrywa prawdziwy
  kontrakt testu — dwa uruchomienia tego samego testu na tej samej bazie
  dadzą różne id, mimo identycznej logiki.
- Zwykły `INSERT` w fixture, która ma być uruchamiana wielokrotnie, kończy
  się `ER_DUP_ENTRY` przy drugim uruchomieniu — potrzebny jest `ON
  DUPLICATE KEY UPDATE` albo sprzątanie przed wstawieniem.
- Mock połączenia do bazy nie odtworzy semantyki `InnoDB`: nie sprawdzi
  realnego złamania `UNIQUE`/`FOREIGN KEY`, nie pokaże efektu poziomu
  izolacji ani niejawnego commitu — test przechodzi na mocku i obleje na
  produkcyjnym silniku.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [InnoDB and the ACID Model / Transaction Model](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html)
- [Statements That Cause an Implicit Commit](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html)
- [INSERT ... ON DUPLICATE KEY UPDATE](https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html)
- [The INFORMATION_SCHEMA COLUMNS Table](https://dev.mysql.com/doc/refman/8.4/en/information-schema-columns-table.html)
- [ALTER TABLE Statement](https://dev.mysql.com/doc/refman/8.4/en/alter-table.html)
