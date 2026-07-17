# Elective: SQLite w Node

**To elective** — najpierw ukończ rdzeń tracka (01–18). Node ma wbudowany
moduł `node:sqlite` (synchroniczny, bez zależności), który czyni SQLite
naturalnym wyborem dla narzędzi CLI, cache'ów i małych usług. Zadania uczą
trzech kontraktów, które przenoszą się na każdą bazę SQL:

**Parametryzacja.** Dane użytkownika trafiają **wyłącznie** do parametrów
(`$nazwa`), nigdy do tekstu SQL. Ale identyfikatorów (kolumna sortowania)
nie da się sparametryzować — te przechodzą przez **allow-listę**. Limit ma
walidowany zakres. To trzy różne mechanizmy dla trzech klas wejścia.

**Transakcje.** Sekwencja powiązanych zapisów (przelew: debet + kredyt)
wykonuje się w transakcji: `BEGIN IMMEDIATE` (od razu bierze lock zapisu,
unikając późniejszego `SQLITE_BUSY` w środku pracy), po sukcesie `COMMIT`,
po **każdym** błędzie `ROLLBACK` i re-throw. Warunki domenowe ("wystarczające
środki") koduje się w samym UPDATE (`AND balance >= ?`) i sprawdza
`changes` — nie przez SELECT przed zapisem, który otwiera okno wyścigu.

**Migracje.** Schemat wersjonuje `user_version`; plan migracji wybiera
wersje nowsze od bieżącej, w rosnącej kolejności, i odrzuca zarówno
duplikaty, jak i luki — brakująca migracja pośrednia to błąd wdrożenia,
nie coś do przeskoczenia.

## Kiedy używać

- Narzędzia CLI i lokalne cache — zero konfiguracji, jeden plik.
- Małe usługi jednoprocesowe o umiarkowanym zapisie.
- Nauka kontraktów SQL przenośnych na Postgres/MySQL.

## Kiedy unikać

- Wysoka współbieżność zapisu wieloprocesowego — to domena serwerowych baz.
- Nie klej SQL ze stringów wejścia "bo to tylko wewnętrzne narzędzie".
- Nie zostawiaj transakcji otwartej między turami event loopa.

## Pułapki

- `BEGIN` (deferred) bierze lock dopiero przy pierwszym zapisie — środek
  transakcji może dostać `SQLITE_BUSY`; `BEGIN IMMEDIATE` przesuwa konflikt
  na start.
- `changes === 0` po UPDATE z warunkiem to informacja domenowa (brak
  środków / brak rekordu) — rozróżniaj ją od błędu SQL.
- Plan migracji na oko "posortuj i jedź" gubi przypadek luki — walidacja
  ciągłości jest częścią kontraktu.

## Źródła (audyt 2026-07-17, Node 24 LTS)

- [node:sqlite](https://nodejs.org/download/release/latest-v24.x/docs/api/sqlite.html)
- [SQLite: transactions](https://sqlite.org/lang_transaction.html)
- [SQLite: PRAGMA user_version](https://sqlite.org/pragma.html#pragma_user_version)
