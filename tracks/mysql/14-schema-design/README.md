# Projektowanie schematu

Schemat to kontrakt egzekwowany przez lata, nie diagram narysowany raz na
start projektu. Trzy decyzje wracają w niemal każdej tabeli: czym jest
klucz (sztuczny `id` czy naturalny klucz biznesowy), co się dzieje z
zależnymi wierszami, gdy rodzic znika (`CASCADE`/`RESTRICT`/`SET NULL`), i
czy dana kolumna opisuje "teraz" (odniesienie przez FK) czy "wtedy"
(niezmienny snapshot).

## Słowniki i normalizacja

Skończony, nazwany zbiór wartości (status, kategoria, rola) zasługuje na
własną tabelę z kluczem obcym, nie na `VARCHAR` powtarzany w każdym
wierszu. Zaleta nie jest tylko kosmetyczna: `ON UPDATE CASCADE` pozwala
zmienić nazwę statusu w jednym miejscu i propagować ją automatycznie,
`ON DELETE RESTRICT` chroni słownik przed usunięciem wartości, która jest
gdzieś jeszcze używana. Dwie różne akcje referencyjne na jednym FK to
często świadomy wybór: rename jest bezpieczną operacją redakcyjną,
usunięcie całej kategorii — nie.

## Relacje wiele-do-wielu

Tabela łącząca (`enrollments` między `students` i `courses`) często ma
własne atrybuty domenowe (status, data), które nie należą do żadnej ze
stron relacji. Para kluczy obcych bywa naturalnym kluczem głównym
(`PRIMARY KEY (student_id, course_id)`) — nie trzeba sztucznego `id`, gdy
sama para już jednoznacznie identyfikuje wiersz. Dwa FK w jednej tabeli
mogą mieć różne akcje `ON DELETE`: cykl życia zapisu bywa podporządkowany
jednej stronie relacji (student usuwa konto → jego zapisy znikają), a
niezależny od drugiej (kurs z historią zapisów nie znika po cichu).

## Snapshoty i semantyka czasu

Klucz obcy mówi, *kim jest* powiązany rekord dzisiaj — podąża za każdą
zmianą rodzica. Dokument historyczny (zamówienie, faktura, log audytowy)
często musi zamrozić dane takie, jakie były w chwili zdarzenia — do tego
służy zwykła kolumna (`customer_email_snapshot`), nie kolejny FK. Snapshot
i referencja współistnieją w tym samym wierszu, bo odpowiadają na różne
pytania: "kto jest właścicielem tego zamówienia dziś" (FK) i "jakie dane
miał klient, gdy je składał" (snapshot).

## Kiedy używać

- Tabeli słownikowej z FK — gdy zbiór wartości jest skończony, nazwany i
  może się zmieniać (rename, dodanie nowej wartości) niezależnie od danych,
  które go używają.
- Naturalnego klucza (w tym złożonego) — gdy kombinacja kolumn już
  jednoznacznie identyfikuje wiersz i nie potrzebujesz dodatkowego
  odniesienia do niego z innej tabeli.
- Snapshotu — dla dokumentów historycznych/transakcyjnych, które muszą
  pozostać czytelne i niezmienne, nawet gdy dane źródłowe (profil klienta)
  się zmienią.

## Kiedy unikać

- Nie dodawaj sztucznego `id AUTO_INCREMENT` do tabeli łączącej, gdy para
  FK już jednoznacznie identyfikuje wiersz — to tylko kolejny indeks do
  utrzymania bez żadnej korzyści.
- Nie normalizuj kolumny o dwóch stałych wartościach (`is_active
  BOOLEAN`) do osobnej tabeli słownikowej — to narzut bez korzyści, gdy
  zbiór wartości nigdy się nie zmienia i nie ma własnych atrybutów.
- Nie snapshotuj wszystkiego "na wszelki wypadek" — kolumna źródłowa
  (referencja przez FK) wystarcza tam, gdzie liczy się aktualny stan, nie
  stan z przeszłości.

## Pułapki

- `ON DELETE CASCADE` bez zastanowienia bywa cichą utratą danych — zawsze
  pytaj, czy zależny wiersz *powinien* zniknąć razem z rodzicem, czy
  powinien zablokować usunięcie (`RESTRICT`) albo przetrwać z odniesieniem
  wyzerowanym (`SET NULL`).
- `CHECK` na `ENUM`-podobnej kolumnie (`status IN (...)`) wymaga zmiany
  definicji tabeli przy każdej nowej wartości — dla wartości, które będą
  rosły (nie tylko wymieniane), tabela słownikowa skaluje się lepiej.
- Snapshot bez jawnej nazwy (`email` zamiast `customer_email_snapshot`)
  wygląda jak zwykła kolumna profilu i ktoś prędzej czy później doda tam
  `ON UPDATE`/synchronizację, która złamie jego sens.
- Kwoty pieniężne jako `FLOAT`/`DOUBLE` tracą precyzję — `DECIMAL(p,s)` to
  jedyny bezpieczny typ na pieniądze w MySQL. Publiczny identyfikator
  (ULID/UUID) bywa `UNIQUE`, ale rzadko powinien być `PRIMARY KEY` — klucz
  klastrowany InnoDB działa najlepiej z kolejnością rosnącą, a losowy
  identyfikator publiczny psuje lokalność wstawiania.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [CREATE TABLE Statement](https://dev.mysql.com/doc/refman/8.4/en/create-table.html)
- [FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)
- [CHECK Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html)
- [InnoDB and FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.4/en/innodb-foreign-key-constraints.html)
- [InnoDB Index Types (Primary Key Design)](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html)
