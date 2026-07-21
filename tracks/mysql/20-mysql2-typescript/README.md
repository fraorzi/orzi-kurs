# mysql2 i TypeScript

`mysql2` mówi TypeScript-owi, że zapytanie zwraca `RowDataPacket[]`, ale
nie wie nic o **kolumnach** w tym wierszu — typ wyniku to deklaracja
programisty, nie coś, co silnik bazy zwalidował. Rozjazd między
deklarowanym interfejsem a realnym kształtem wiersza (zmieniona nazwa
kolumny, `NULL` tam, gdzie interfejs mówi `string`) nie da błędu
kompilacji — da `undefined` albo `null` w runtime, tam gdzie kod zakłada
wartość.

**Parametryzacja** to nie kwestia stylu, tylko bezpieczeństwa:
`pool.execute("... WHERE email = ?", [email])` wysyła dane osobno od
tekstu zapytania — `email` nigdy nie jest interpretowany jako SQL,
niezależnie od tego, co zawiera (apostrof, `--`, cudzysłów). Interpolacja
stringów (`` `WHERE email = '${email}'` ``) łamie się na dwa sposoby:
legalny e-mail z apostrofem (`o'brien@example.com`) psuje składnię
zapytania, a złośliwy input zamienia dane w kod SQL. `execute` dodatkowo
przygotowuje (`PREPARE`) i cache'uje plan zapytania po stronie serwera dla
tego samego tekstu — `query` tego nie robi.

**Transakcja na `Pool` wymaga jednej dedykowanej sesji.** `pool.execute()`
wywołane kilka razy z rzędu może za każdym razem wypożyczyć **inne**
połączenie z puli — `BEGIN` na jednym połączeniu i `INSERT` na innym to
dwie osobne, niepowiązane transakcje. Poprawny wzorzec: `const connection
= await pool.getConnection()`, `beginTransaction()` na tym jednym obiekcie,
wszystkie operacje przez `connection` (nie przez `pool`), `commit()` na
happy path, `rollback()` w `catch`, i **zawsze** `connection.release()`
w `finally` — connection, którego nikt nie zwrócił do puli, to pula, która
się z czasem wyczerpuje (kolejne `getConnection()` zaczynają czekać
w nieskończoność, bez błędu, dopóki nie minie `queueLimit`/timeout).

**Deadlock** (`errno 1213`) i **lock wait timeout** (`errno 1205`) różnią
się od innych błędów SQL jedną rzeczą: są **retryable**. InnoDB
automatycznie wybiera "ofiarę" (jedną z transakcji w cyklu oczekiwania)
i robi jej `ROLLBACK` — cała transakcja, nie pojedyncza instrukcja.
Poprawna odpowiedź aplikacji to ponowienie **całej** transakcji od
`BEGIN`, na nowym połączeniu, z ograniczoną liczbą prób — nie ponawianie
pojedynczej nieudanej instrukcji w środku tej samej, już wycofanej
transakcji.

## Kiedy używać

- `execute` z markerami `?` do każdego zapytania przyjmującego dane spoza
  kodu źródłowego — nawet gdy dane "na pewno" nie mają w sobie znaków
  specjalnych; to założenie ma żywotność jednego zgłoszenia bugu.
- Dedykowanego `PoolConnection` (nie `pool` bezpośrednio) dla każdej
  sekwencji operacji, która ma być atomowa — zamówienie z pozycjami,
  transfer między kontami, migracja wieloetapowa w ramach jednej sesji.
- Retry całej transakcji na `errno 1213`/`1205`, gdy operacja jest
  idempotentna albo bezpieczna do powtórzenia (nie zmieniła stanu poza
  bazą przed błędem).

## Kiedy unikać

- Nie twórz nowego `PoolConnection` per zapytanie wewnątrz jednej logicznej
  transakcji — to gwarantowany sposób na "commit" części operacji na
  osobnych sesjach, których żadna transakcja nie łączy.
- Nie ponawiaj automatycznie błędów innych niż deadlock/lock wait timeout
  — `ER_DUP_ENTRY` czy naruszenie `CHECK` powtórzone bez zmiany danych da
  dokładnie ten sam błąd w nieskończoność.
- Nie ufaj typom TypeScript jako walidacji danych z bazy — `RowDataPacket`
  to deklaracja kształtu, nie sprawdzenie w runtime; walidację brzegową
  (np. `zod`) rób jawnie, gdy kształt danych ma znaczenie bezpieczeństwa.

## Pułapki

- `pool.execute()` wywołane wielokrotnie może użyć innej sesji za każdym
  razem — transakcja rozpoczęta jedną instrukcją i kontynuowana drugą
  na `pool` bezpośrednio, zamiast na jednym `PoolConnection`, nie istnieje
  jako spójna całość.
- Zapomniany `connection.release()` w ścieżce błędu (np. tylko w happy
  path, nie w `catch`/`finally`) wycieka połączenia z puli — objaw
  pojawia się dopiero po wielu nieudanych wywołaniach, gdy pula się
  wyczerpie.
- Ponowienie pojedynczej instrukcji po deadlocku zamiast całej transakcji
  zostawia część zmian z pierwszej, wycofanej próby niezatwierdzoną —
  InnoDB robi `ROLLBACK` całej transakcji ofiary, nie jednej instrukcji.
- `mysql2` z `decimalNumbers: false` (wartość domyślna biblioteki) zwraca
  `DECIMAL` i duże agregaty jako **string**, nie `number` — porównanie
  `=== 10` na takiej kolumnie zawsze zawiedzie, mimo poprawnej wartości.
- Interpolacja stringa do SQL psuje się nie tylko na ataku — legalny input
  z apostrofem (nazwisko, e-mail, tekst użytkownika) łamie składnię
  zapytania tym samym mechanizmem.

## Źródła (audyt 2026-07-18, MySQL 8.4 / mysql2)

- [mysql2 Documentation](https://sidorares.github.io/node-mysql2/docs/documentation)
- [mysql2 Prepared Statements](https://sidorares.github.io/node-mysql2/docs/documentation/prepared-statements)
- [mysql2 Connection Pooling](https://sidorares.github.io/node-mysql2/docs/documentation/pooling)
- [InnoDB Deadlocks Handling](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html)
- [InnoDB Lock Wait Timeout](https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html#sysvar_innodb_lock_wait_timeout)
