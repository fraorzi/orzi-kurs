# Constraints i relacje

Walidacja w kodzie aplikacji chroni tylko tę jedną ścieżkę zapisu. Import
CSV, migracja danych, drugi serwis piszący do tej samej bazy albo
`mysql` z konsoli administratora omijają ją całkowicie — a niezmiennik,
który obowiązuje "zwykle", prędzej czy później zostanie złamany właśnie
tam, gdzie nikt nie patrzył. Constraint zadeklarowany w `CREATE TABLE`
(`NOT NULL`, `CHECK`, `UNIQUE`, `FOREIGN KEY`) obowiązuje każdą ścieżkę
zapisu, niezależnie od tego, kto ani czym pisze.

`CHECK` ma jednak tę samą pułapkę co `WHERE` z tematu 1: to wyrażenie
logiczne, a MySQL odrzuca wiersz tylko wtedy, gdy wynik jest jawnie FALSE.
`CHECK (quantity > 0)` na kolumnie dopuszczającej `NULL` **przepuszcza**
`NULL` — porównanie `NULL > 0` daje UNKNOWN, nie FALSE. Constraint "ilość
dodatnia" wymaga więc dwóch reguł naraz: `NOT NULL` blokuje brak wartości,
`CHECK` blokuje wartość niepoprawną.

Klucz obcy ma politykę `ON DELETE`, która koduje decyzję domenową o relacji
rodzic–dziecko. `RESTRICT` (domyślne zachowanie) blokuje usunięcie rodzica,
dopóki istnieje choć jedno odwołujące się dziecko — dobre dla klienta
z historią zamówień, którą trzeba zachować. `CASCADE` usuwa dzieci razem
z rodzicem — dobre dla pozycji zamówienia, które nie mają sensu bez
zamówienia. Pomylenie tych dwóch albo usuwa historię, której nie powinno
się ruszać, albo blokuje operację, która powinna przejść kaskadowo.

Wielonajemczy model danych potrzebuje **złożonych** kluczy: globalny
`UNIQUE(slug)` fałszywie zabrania dwóm różnym najemcom użycia tego samego
identyfikatora, więc unikalność musi być złożona — `UNIQUE(tenant_id,
slug)`. To samo dotyczy klucza obcego: żeby zadanie mogło wskazywać
wyłącznie projekt **tego samego** najemcy, klucz obcy musi referencjonować
`(tenant_id, project_id)` łącznie, a rodzic musi mieć klucz unikalny albo
główny na dokładnie tej parze kolumn.

## Kiedy używać

- `CHECK` + `NOT NULL` razem, gdy wartość ma sens tylko w pewnym zakresie
  i nie może być pusta — cena, ilość, procent.
- `ON DELETE RESTRICT` (domyślne) dla relacji, w których dziecko ma
  samodzielne znaczenie biznesowe lub prawne (zamówienie klienta, faktura).
- `ON DELETE CASCADE` dla danych składowych bez sensu poza agregatem
  (pozycje zamówienia, wiersze koszyka).
- Złożony `UNIQUE`/`FOREIGN KEY` na `(tenant_id, ...)`, gdy dane są
  partycjonowane per najemca/organizacja i unikalność ma obowiązywać
  tylko w obrębie jednego z nich.

## Kiedy unikać

- Nie ufaj wyłącznie typom i walidacji w aplikacji jako jedynej ochronie
  niezmiennika — każda ścieżka zapisu spoza tej aplikacji je omija.
- Nie zakładaj, że sam `CHECK` wystarczy do wymuszenia "wartość musi
  istnieć i być poprawna" — bez `NOT NULL` NULL zawsze przejdzie.
- Nie ustawiaj `CASCADE` jako domyślnego wyboru "na wszelki wypadek" —
  usunięcie jednego wiersza może kaskadowo skasować duży graf danych,
  którego nikt nie planował usuwać.
- Nie zostawiaj constraintów bez nazwy (`CONSTRAINT nazwa CHECK/FOREIGN
  KEY ...`) — autogenerowana nazwa MySQL jest bezużyteczna w logu błędu
  i w migracji, która ma ją później zmienić albo usunąć.

## Pułapki

- `CHECK (quantity > 0)` na kolumnie `NULL`-owalnej przepuszcza `NULL` —
  trójwartościowa logika SQL nie traktuje UNKNOWN jak FALSE.
- Błąd naruszenia `NOT NULL` (`ER_BAD_NULL_ERROR`) i błąd naruszenia
  `CHECK` (`ER_CHECK_CONSTRAINT_VIOLATED`) to różne kody — kod w
  aplikacji, który łapie tylko jeden z nich, przepuści drugi przypadek.
  `ER_DUP_ENTRY` (unique/PK) i `ER_NO_REFERENCED_ROW_2`/
  `ER_ROW_IS_REFERENCED_2` (foreign key) to kolejna, osobna para.
- Composite foreign key wymaga, żeby referencjonowana tabela miała
  `UNIQUE`/`PRIMARY KEY` na **dokładnie** tych samych kolumnach w tej
  samej kolejności — `FOREIGN KEY (tenant_id, project_id) REFERENCES
  projects(tenant_id, id)` nie zadziała, jeśli `projects` ma tylko
  `PRIMARY KEY (id)` bez `tenant_id` w kluczu.
- Globalny `UNIQUE(slug)` w modelu wielonajemczym to fałszywe ograniczenie
  — blokuje poprawny scenariusz (dwóch różnych najemców, ten sam slug),
  a nie chroni przed realnym błędem.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [Constraints](https://dev.mysql.com/doc/refman/8.4/en/constraints.html)
- [CHECK Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html)
- [FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)
- [Server Error Message Reference](https://dev.mysql.com/doc/refman/8.4/en/server-error-reference.html)
