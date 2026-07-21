# Transakcje i savepointy

MySQL domyślnie działa w trybie `autocommit = 1`: każdy pojedynczy
statement poza jawną transakcją commituje się natychmiast, sam. Operacja
biznesowa złożona z kilku statementów ("przenieś saldo i zapisz ledger")
bez `START TRANSACTION` nie jest jedną całością — to trzy niezależne,
osobno zatwierdzane operacje. Awaria między drugą a trzecią zostawia stan
w połowie drogi, mimo że każdy statement z osobna zadziałał poprawnie.
`START TRANSACTION ... COMMIT` spina je w jedną, niepodzielną jednostkę:
albo wszystkie efekty widoczne na zewnątrz, albo żaden.

Największa pułapka tematu: **błąd wewnątrz transakcji sam jej nie
wycofuje**. Naruszenie `CHECK`/`UNIQUE`/`FOREIGN KEY` w środku sekwencji
statementów domyślnie cofa tylko ten jeden statement — reszta, która już
się wykonała wcześniej, zostaje w stanie pending, dopóki ktoś jawnie nie
wykona `ROLLBACK` (albo `COMMIT`, co zatwierdziłoby połowiczny wynik).
W surowym SQL, bez frameworku, który automatycznie łapie wyjątek i robi
`ROLLBACK` za ciebie, ta odpowiedzialność spada na `DECLARE EXIT HANDLER`
w procedurze albo na kod aplikacji.

`SAVEPOINT` daje punkt pośredni wewnątrz transakcji: `ROLLBACK TO
SAVEPOINT nazwa` cofa tylko statementy wykonane po nim, ale **nie kończy**
transakcji — po `ROLLBACK TO SAVEPOINT` transakcja nadal trwa i wciąż
wymaga finalnego `COMMIT` albo pełnego `ROLLBACK`. To narzędzie do "ten
jeden opcjonalny krok się nie udał, reszta ma przejść", nie substytut
granicy transakcji.

Trzecia pułapka: DDL (`CREATE`/`ALTER`/`DROP TABLE`) w MySQL wykonuje
**implicit commit** — zatwierdza cichcem wszystko, co było pending w
bieżącej transakcji, zanim samo się wykona, i samo nie da się wycofać.
Transakcja biznesowa, która przypadkiem zawiera DDL w środku, przestaje
być jedną całością w miejscu, gdzie nikt tego nie oczekuje.

## Kiedy używać

- `START TRANSACTION ... COMMIT` wokół każdej sekwencji statementów, która
  ma się zastosować w całości albo wcale — transfer, zamówienie z
  pozycjami, dowolna operacja "kilka tabel na raz".
- `SAVEPOINT` w środku dłuższej transakcji, gdy jeden krok jest
  opcjonalny/best-effort (telemetria, log pomocniczy), a reszta ma się
  zatwierdzić niezależnie od jego wyniku.
- `DECLARE EXIT HANDLER FOR SQLEXCEPTION ... ROLLBACK; RESIGNAL;`
  w procedurach, które wykonują więcej niż jeden zapis — żeby błąd jednego
  z nich cofnął wszystkie i doszedł do wywołującego z oryginalnym kodem.

## Kiedy unikać

- Nie zakładaj, że wyjątek w trakcie transakcji automatycznie ją wycofuje
  — bez jawnego `ROLLBACK` (albo handlera, który go wykonuje) poprzednie
  statementy zostają zatwierdzone przy najbliższym `COMMIT`.
- Nie umieszczaj DDL w środku transakcji biznesowej, która ma pozostać
  atomowa — implicit commit zamyka ją przedwcześnie i nieodwracalnie.
- Nie traktuj `SAVEPOINT` jako zamiennika transakcji — to punkt kontrolny
  wewnątrz jednej transakcji, nie osobna jednostka atomowości.

## Pułapki

- Błąd statementu w transakcji bez handlera zostawia wcześniejsze zmiany
  w stanie pending — widoczne w tej samej sesji (read own writes), ale
  niezatwierdzone. Kolejny `START TRANSACTION` w tej samej sesji cicho
  zacommituje tę resztkę, zanim zacznie nową transakcję.
- `ROLLBACK TO SAVEPOINT` nie kończy transakcji — pominięcie finalnego
  `COMMIT`/`ROLLBACK` zostawia sesję z otwartą transakcją.
- Nazwa `SAVEPOINT` użyta drugi raz w tej samej transakcji nadpisuje
  poprzedni punkt o tej nazwie, nie tworzy nowego.
- `DECLARE EXIT HANDLER FOR SQLEXCEPTION` łapie błąd, ale `RESIGNAL` bez
  argumentów jest konieczny, żeby wywołujący dostał oryginalny kod i
  komunikat błędu, a nie generyczny sukces albo inny błąd.
- DDL w środku transakcji wykonuje implicit commit — nie da się go cofnąć
  przez `ROLLBACK`.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [START TRANSACTION, COMMIT, and ROLLBACK Statements](https://dev.mysql.com/doc/refman/8.4/en/commit.html)
- [SAVEPOINT Statement](https://dev.mysql.com/doc/refman/8.4/en/savepoint.html)
- [Statements That Cause an Implicit Commit](https://dev.mysql.com/doc/refman/8.4/en/implicit-commit.html)
- [DECLARE ... HANDLER Statement](https://dev.mysql.com/doc/refman/8.4/en/declare-handler.html)
- [InnoDB Error Handling](https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html)
