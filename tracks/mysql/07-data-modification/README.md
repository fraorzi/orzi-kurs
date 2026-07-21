# Bezpieczne modyfikowanie danych

`INSERT`/`UPDATE`/`DELETE` jako pojedynczy statement jest w InnoDB atomowy —
albo zastosuje się cały, albo wcale. To nie znaczy, że operacja domenowa
jest bezpieczna: "przenieś płatność" to zwykle dwa albo trzy statementy
(zmień saldo, zapisz ledger, może usuń rezerwację), a atomowość
pojedynczego `UPDATE` nie chroni przed tym, że drugi statement w tej samej
operacji nigdy się nie wykona. Wiele statementów tej samej operacji
domenowej należy do jednej transakcji (temat 09) — tu zakładamy, że
transakcja już istnieje, i skupiamy się na tym, żeby pojedynczy statement
robił dokładnie to, co ma robić.

Druga oś to **jawność**. `INSERT INTO users VALUES (1, 'a@example.com',
NULL)` działa dziś, ale milczy o tym, która wartość trafia do której
kolumny — dodanie kolumny w środku tabeli przesuwa pozycje i cicho
podstawia złe wartości pod złe kolumny. Jawna lista kolumn
(`INSERT INTO users (id, email) VALUES (...)`) czyni kontrakt odpornym na
zmianę schematu, a pominięcie kolumny (zamiast wpisania `NULL`) pozwala
zadziałać jej `DEFAULT`.

Trzecia oś to **upsert**. `INSERT ... ON DUPLICATE KEY UPDATE` reaguje na
konflikt **dowolnego** unique key albo klucza głównego tabeli — jeśli
tabela ma więcej niż jeden unique constraint, z samego zapytania nie widać,
który z nich zadziałał. Wewnątrz klauzuli `UPDATE` odróżnij wartość już
zapisaną w tabeli (`cart_items.qty`) od wartości przychodzącej z
`VALUES (...) AS incoming` — pomylenie tych dwóch zamienia "dodaj do
istniejącej ilości" w "nadpisz istniejącą ilość", co ginie przy pierwszym
konflikcie i ujawnia się dopiero przy drugim zgłoszeniu tego samego
produktu.

## Kiedy używać

- Jawna lista kolumn w `INSERT` zawsze — nawet gdy dziś wypełniasz
  wszystkie kolumny tabeli w naturalnej kolejności.
- `ON DUPLICATE KEY UPDATE` do idempotentnych zapisów: retry tego samego
  żądania (np. po timeout) nie ma tworzyć drugiego wiersza ani zdublować
  wartości.
- `INSERT ... SELECT` + `DELETE` z **identycznym predykatem** `WHERE`, gdy
  archiwizujesz przed usunięciem — dwa statementy muszą operować na
  dokładnie tym samym zbiorze wierszy.

## Kiedy unikać

- Nie pisz `DELETE`/`UPDATE` bez zawężonego `WHERE` w kodzie, który ma
  kiedykolwiek trafić na produkcję — brak `WHERE` zmienia cały zbiór, nie
  tylko wiersz, o który chodziło.
- `REPLACE INTO` nie jest bezpiecznym upsertem: to `DELETE` + `INSERT` pod
  maską — resetuje wartości kolumn spoza konfliktu do wartości domyślnych,
  kaskaduje `ON DELETE CASCADE` u zależnych tabel i odpala trigery usunięcia
  tam, gdzie oczekujesz tylko aktualizacji.
- Nie zakładaj, że affected rows z `UPDATE` to liczba wierszy dopasowanych
  przez `WHERE` — domyślnie MySQL liczy tylko wiersze, których wartość
  faktycznie się zmieniła.

## Pułapki

- Jawny `NULL` w `VALUES` dla kolumny `NOT NULL DEFAULT ...` **nie**
  uruchamia defaultu i przy rygorystycznym `sql_mode` kończy się błędem —
  default działa tylko dla pominiętej kolumny albo słowa kluczowego
  `DEFAULT` wprost w `VALUES`.
- `INSERT INTO t VALUES (...)` bez listy kolumn cicho psuje się przy
  zmianie schematu — dodana albo przestawiona kolumna przesuwa pozycje bez
  błędu składni.
- `ON DUPLICATE KEY UPDATE qty = qty + incoming.qty` wymaga, żeby
  `cart_items.qty` po lewej i `incoming.qty` po prawej nie zostały
  przypadkiem zamienione miejscami — obie strony się kompilują, tylko
  jedna daje sumę, a druga nadpisanie.
- Archiwizacja przed usunięciem dwoma statementami o różnym `WHERE`
  (np. INSERT z jednym warunkiem, DELETE bez warunku) archiwizuje jeden
  zbiór, a usuwa inny — i bez transakcji okno między nimi jest widoczne
  dla innych połączeń.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [INSERT Statement](https://dev.mysql.com/doc/refman/8.4/en/insert.html)
- [UPDATE Statement](https://dev.mysql.com/doc/refman/8.4/en/update.html)
- [DELETE Statement](https://dev.mysql.com/doc/refman/8.4/en/delete.html)
- [INSERT ... ON DUPLICATE KEY UPDATE Statement](https://dev.mysql.com/doc/refman/8.4/en/insert-on-duplicate.html)
- [REPLACE Statement](https://dev.mysql.com/doc/refman/8.4/en/replace.html)
