# Migracje, online DDL i restore drill

Zmiana schematu na produkcyjnej tabeli, którą czyta i pisze wiele instancji
aplikacji naraz, ma dwa niezależne ryzyka: sam `ALTER` może zablokować
tabelę na czas trwania operacji, a nowy kontrakt danych (`NOT NULL`,
`UNIQUE`, nowa kolumna wymagana przez kod) może być niezgodny ze starą
wersją aplikacji, która wciąż działa na części serwerów w trakcie rollout.
Oba ryzyka rozwiązuje ten sam wzorzec: rozłożenie zmiany na etapy i wybór
właściwego algorytmu DDL.

## Expand / backfill / contract

Zamiast jednego `ALTER` zaostrzającego kontrakt od razu, migracja
kompatybilna do przodu ma trzy etapy: **expand** (dodaj kolumnę jako
`NULL`, bez wymagań — stara i nowa wersja aplikacji nadal działają),
**backfill** (wypełnij ją na podstawie istniejących danych), **contract**
(dopiero teraz dodaj `NOT NULL`/`UNIQUE`, gdy wszystkie wiersze mają
wartość). Usunięcie starej kolumny to osobny, *późniejszy* contract —
dopiero gdy żadna wdrożona wersja kodu jej nie czyta. Backfill bywa
miejscem, gdzie ujawniają się brudne dane: dwa stare rekordy, które po
normalizacji kolidują (ten sam numer telefonu w dwóch formatach), mają
zablokować migrację (`UNIQUE` odrzuca duplikat), nie zniknąć po cichu.

## ALGORITHM i online DDL

InnoDB obsługuje część operacji `ALTER TABLE` bez przepisywania całej
tabeli: `ALGORITHM=INSTANT` (np. dodanie kolumny z wartością domyślną) to
zmiana czysto w metadanych, `ALGORITHM=INPLACE` przebudowuje strukturę bez
kopiowania wierszy do nowej tabeli, ale wciąż może blokować niektóre
operacje równoległe. `ALGORITHM=COPY` przepisuje całą tabelę i blokuje
zapisy na czas trwania — to opcja awaryjna, nie domyślna. Jawne podanie
algorytmu (`ALGORITHM=INSTANT`) sprawia, że migracja *odmawia* wykonania,
jeśli operacja nie kwalifikuje się do szybkiej ścieżki, zamiast po cichu
spaść do wolnego `COPY` na produkcji.

## Backup, który nic nie dowodzi

`mysqldump` bez próby odtworzenia to plik, którego nikt nie sprawdził —
format może być niekompletny, uprawnienia do zapisu przy restore mogą nie
istnieć, a sam proces mógł się wywrócić w połowie bez wyraźnego błędu.
Restore drill (`mysql restore_check < dump.sql` do osobnej, jednorazowej
bazy, z weryfikacją liczby wierszy i checksumy) to jedyny sposób, żeby
backup *udowodnił* odzyskiwalność, zanim będzie potrzebny naprawdę.
`--single-transaction` daje spójny snapshot z silników transakcyjnych bez
blokowania zapisów na czas trwania dumpu.

## Kiedy używać

- Expand/backfill/contract przy każdej zmianie kontraktu (`NOT NULL`,
  `UNIQUE`, zmiana typu) na tabeli, która ma ruch produkcyjny i rollout
  wieloetapowy (stara i nowa wersja kodu działają jednocześnie).
- Jawnego `ALGORITHM` przy każdym `ALTER TABLE` na tabeli, gdzie blokada
  zapisu na czas operacji jest niedopuszczalna.
- Restore drill przed każdą nieodwracalną operacją na produkcji
  (`DROP COLUMN`, `DROP TABLE`, migracja danych) — backup ma być
  zweryfikowany, zanim stanie się jedyną deską ratunku.

## Kiedy unikać

- Nie łącz `expand` i `contract` w jednej migracji, jeśli rollout trwa
  dłużej niż moment — stara wersja aplikacji dostanie błąd na kolumnie,
  która właśnie zniknęła.
- Nie zakładaj `ALGORITHM=INSTANT` bez sprawdzenia listy operacji, które
  się do niego kwalifikują — nie każdy `ALTER` jest metadata-only, mimo że
  wygląda niegroźnie.
- Nie traktuj samego istnienia pliku dumpu jako dowodu na możliwość
  odtworzenia — bez próbnego restore to tylko nadzieja.

## Pułapki

- DDL wykonuje niejawny `COMMIT` przed i po sobie — migracja w środku
  otwartej transakcji z danymi nie jest z nią atomowa; `ALGORITHM=INPLACE`/
  `INSTANT` nadal bierze metadata lock na początku i końcu operacji.
- Dodanie kolumny `NOT NULL` bez `DEFAULT` do niepustej tabeli odrzuca się
  pod domyślnym `sql_mode` — zawsze dawaj `DEFAULT` albo idź ścieżką
  expand/backfill/contract.
- Migracja bez ochrony przed powtórnym uruchomieniem (`schema_migrations`
  z `PRIMARY KEY` na wersji) ma zawieść głośno przy ponownym odpaleniu, nie
  scalić zmiany po cichu drugi raz.
- Backfill na dużej tabeli w jednej transakcji potrafi urosnąć do
  wielogodzinnego locka — produkcja dzieli go na paczki, czego ten temat
  celowo nie pokazuje na małych zbiorach testowych.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Online DDL for InnoDB Tables](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl.html)
- [Online DDL Limitations](https://dev.mysql.com/doc/refman/8.4/en/innodb-online-ddl-limitations.html)
- [ALTER TABLE Statement](https://dev.mysql.com/doc/refman/8.4/en/alter-table.html)
- [mysqldump — A Database Backup Program](https://dev.mysql.com/doc/refman/8.4/en/mysqldump.html)
- [Backup and Recovery](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html)
