# Views, generated columns i triggery

Wszystkie trzy mechanizmy przenoszą logikę z klienta do schematu — zapytanie,
wyrażenie albo reakcja na DML żyje w bazie, nie w aplikacji. Zysk: każdy
klient (dashboard, migracja, drugi zespół) widzi ten sam kontrakt. Koszt:
logika staje się niewidoczna w `git blame` aplikacji i łatwo o efekt uboczny,
którego nikt nie przewidział.

**View** to zapisane zapytanie, nie kopia danych — wykonuje się przy każdym
odczycie. Kluczowa decyzja to `SQL SECURITY`: `DEFINER` (domyślny) uruchamia
widok z uprawnieniami autora widoku, nie wywołującego — użytkownik bez
dostępu do tabeli źródłowej może przez `DEFINER`-view zobaczyć dane, do
których wprost dostępu nie ma. `INVOKER` wymaga, by wywołujący miał własne
uprawnienia do bazowych tabel. Widoki bywają też aktualizowalne (`UPDATE`/
`DELETE` przez widok), ale tylko gdy mapują się jeden-do-jednego na wiersze
jednej tabeli — `GROUP BY`, `DISTINCT`, agregaty, `UNION` czy podzapytanie
w referencjonowanej tabeli wyłączają aktualizowalność bez ostrzeżenia przy
tworzeniu.

**Generated column** to kolumna, której wartość liczy wyrażenie, nie klient.
`VIRTUAL` (domyślne) liczy się przy każdym odczycie i nie zajmuje miejsca na
dysku, ale **można** ją indeksować — InnoDB utrzymuje indeks, materializując
wartość tylko dla wpisu w indeksie. `STORED` liczy się przy każdym
`INSERT`/`UPDATE` dotykającym kolumn źródłowych i jest fizycznie
zapisywana — nadaje się pod `FOREIGN KEY`, `UNIQUE` na całej kolumnie
i odczyty bez kosztu przeliczenia. Wybór to trade-off zapis-vs-odczyt, nie
kwestia gustu.

**Trigger** reaguje na `INSERT`/`UPDATE`/`DELETE`, `BEFORE` lub `AFTER`,
niewidocznie dla klienta wykonującego DML. `BEFORE` może modyfikować `NEW.*`
(np. normalizować wartość przed zapisem), `AFTER` już nie — służy do efektów
ubocznych (audyt, kaskada). MySQL **nie ma** `INSTEAD OF` triggerów (w
przeciwieństwie do PostgreSQL/SQL Server) — nie da się w ten sposób przechwycić
zapisu do widoku. Błąd wewnątrz triggera przerywa całą instrukcję, również
dla wsadowego `INSERT ... SELECT` na tysiącach wierszy.

## Kiedy używać

- View z `INVOKER`, gdy chcesz zawęzić widoczne kolumny/wiersze bez
  duplikowania zapytania w każdym kliencie (np. ukryć `password_hash`).
- `STORED` generated column, gdy wynik ma być indeksowalny na całej wartości,
  wymuszać `UNIQUE`/`NOT NULL` albo uczestniczyć w `FOREIGN KEY`.
- `VIRTUAL` generated column, gdy potrzebujesz indeksu do filtrowania, ale
  zapis jest częstszy niż odczyt i nie chcesz płacić kosztu przeliczenia
  przy każdym `UPDATE` niezwiązanej kolumny.
- Trigger `AFTER`, gdy potrzebujesz niezależnego od klienta audytu albo
  utrzymania niezmiennika między tabelami, którego żaden klient nie może
  pominąć.

## Kiedy unikać

- Nie używaj `DEFINER`-view jako domyślnego wyboru — eskaluje uprawnienia
  cicho; wybieraj go świadomie, gdy właśnie o to chodzi (np. raport dla roli
  bez dostępu do tabeli źródłowej).
- Nie zastępuj modelu domenowego generated column — wyrażenie ma być proste
  i deterministyczne (normalizacja, konkatenacja), nie logika biznesowa.
- Nie chowaj w triggerze czegoś, co powinno być jawną transakcją w kodzie
  aplikacji — trigger jest niewidoczny w code review PR-a aplikacyjnego
  i trudny do śledzenia w produkcji.
- Nie licz na kolejność wielu triggerów tego samego zdarzenia bez jawnego
  `FOLLOWS`/`PRECEDES` — domyślna kolejność to kolejność tworzenia, łatwa do
  przypadkowego odwrócenia przy migracji.

## Pułapki

- `SELECT *` w definicji widoku rozszerza jego "API" przy każdej zmianie
  tabeli źródłowej — nowa kolumna w tabeli pojawia się w widoku bez
  świadomej decyzji, łącznie z wrażliwymi polami.
- `DEFINER` domyślny: widok utworzony przez konto z szerokimi uprawnieniami
  działa z tymi uprawnieniami dla każdego, kto ma `SELECT` na widoku.
- `VIRTUAL` generated column bez indeksu przelicza wyrażenie przy **każdym**
  odczycie wiersza — kosztowne wyrażenie w hot path zapytania boli.
- `FOREIGN KEY` nie może referencjonować kolumny `VIRTUAL` (InnoDB odrzuci
  definicję błędem `ER_FK_CANNOT_USE_VIRTUAL_COLUMN`) — pod klucz obcy
  potrzebujesz `STORED`; `UNIQUE`/zwykły indeks na `VIRTUAL` działa bez
  przeszkód.
- Trigger `AFTER UPDATE` bez warunku "czy wartość faktycznie się zmieniła"
  (`OLD.col <=> NEW.col`) generuje szum audytowy przy no-op update — jedna
  aktualizacja niepowiązanej kolumny tworzy fałszywy wpis "zmiana statusu".
- Błąd w triggerze przerywa całą instrukcję nadrzędną, nie tylko wiersz —
  masowy `UPDATE` zatrzyma się w połowie na tym, co zdążył wykonać w ramach
  tej instrukcji.
- `ALTER TABLE ... MODIFY` kolumny generowanej na `STORED` przelicza
  wszystkie istniejące wiersze — na dużej tabeli to operacja porównywalna
  z pełną migracją danych, nie kosmetyczna zmiana metadanych.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [CREATE VIEW Statement](https://dev.mysql.com/doc/refman/8.4/en/create-view.html)
- [View Updatability](https://dev.mysql.com/doc/refman/8.4/en/view-updatability.html)
- [Generated Columns](https://dev.mysql.com/doc/refman/8.4/en/create-table-generated-columns.html)
- [Trigger Syntax](https://dev.mysql.com/doc/refman/8.4/en/trigger-syntax.html)
- [Using Triggers](https://dev.mysql.com/doc/refman/8.4/en/triggers.html)
