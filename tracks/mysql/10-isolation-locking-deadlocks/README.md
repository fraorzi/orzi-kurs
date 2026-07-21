# Izolacja, blokady i deadlocki

Zwykły `SELECT` w InnoDB (nawet w transakcji) **nie blokuje nic** — to
odczyt spójnego migawki (MVCC), nie żądanie blokady. Dwie sesje robiące
`SELECT quantity FROM inventory; -- sprawdź, potem UPDATE` mogą obie
przeczytać `quantity = 5` **przed** tym, jak którakolwiek z nich zapisze —
obie uznają, że zapasu starcza, obie odejmują, wynik jest zaniżony. To
klasyczny wyścig read-modify-write, którego żaden `CHECK` ani transakcja
sama w sobie nie powstrzyma, bo problem nie leży w atomowości zapisu,
tylko w tym, że odczyt nie zablokował nic przed innym odczytem.

`SELECT ... FOR UPDATE` to **blokujący** odczyt: pobiera blokadę
wyłączną (exclusive) na przeczytanych wierszach, którą trzyma do końca
transakcji (`COMMIT`/`ROLLBACK`), nie do końca statementu. Druga sesja
próbująca `FOR UPDATE` (albo zwykły `UPDATE`) na tym samym wierszu
**czeka**, aż pierwsza sesja zakończy transakcję — dopiero wtedy widzi
efekt jej zapisu, nie stan sprzed niego. To zamienia wyścig w kolejkę.

Poziom izolacji **REPEATABLE READ** (domyślny w MySQL) ustanawia migawkę
danych przy pierwszym spójnym odczycie transakcji — kolejne zwykłe
odczyty w tej samej transakcji widzą tę samą migawkę, nawet jeśli inna
sesja w międzyczasie commituje zmiany. **READ COMMITTED** ustanawia nową
migawkę przy **każdym** statemencie — dwa kolejne odczyty tej samej
transakcji mogą zwrócić różne wyniki, jeśli coś zostało zatwierdzone
pomiędzy nimi. Żaden z tych poziomów nie blokuje pisania ani nie jest
blokowany przez nie (to osobna oś od `FOR UPDATE`).

**Deadlock** to dwie transakcje blokujące te same dwa wiersze w
odwrotnej kolejności — A trzyma blokadę na wierszu 1 i czeka na wiersz 2,
B trzyma blokadę na wierszu 2 i czeka na wiersz 1. InnoDB wykrywa cykl w
grafie oczekiwania i **natychmiast** przerywa jedną z transakcji (błąd
1213, `ER_LOCK_DEADLOCK`), cofając ją w całości — druga kończy się
normalnie. To oczekiwany produkt uboczny współbieżności, nie błąd
aplikacji: poprawna reakcja to złapanie kodu 1213 i ponowienie **całej**
transakcji od `START TRANSACTION`, nie kontynuacja w miejscu przerwania —
ofiara została cofnięta w całości.

## Kiedy używać

- `SELECT ... FOR UPDATE` w tej samej transakcji co następujący po nim
  `UPDATE`, gdy decyzja o zapisie zależy od odczytanej wartości
  (rezerwacja zapasu, unikalny numer z licznika, kolejka zadań).
- `REPEATABLE READ` (domyślne), gdy operacja robi kilka odczytów w jednej
  transakcji i muszą się ze sobą zgadzać przez cały czas jej trwania.
- Retry całej transakcji po błędzie 1213 — z ograniczoną liczbą prób, żeby
  nie zapętlić się w nieskończoność przy trwałej kontencji.

## Kiedy unikać

- Nie polegaj na zwykłym `SELECT` jako ochronie przed wyścigiem — to
  odczyt bez blokady, niezależnie od poziomu izolacji.
- `SKIP LOCKED` nie nadaje się, gdy wynik ma być precyzyjny i spójny —
  celowo pomija zablokowane wiersze, dając niepełny, niedeterministyczny
  widok; dobre dla kolejki zadań, złe dla salda czy stanu magazynu.
- Nie próbuj "kontynuować" transakcji po złapaniu deadlocku bez pełnego
  retry — InnoDB już wycofał całą transakcję ofiary, stan aplikacji w
  pamięci nie odpowiada już stanowi bazy.

## Pułapki

- Zwykły `SELECT` nie blokuje nawet w transakcji — dwie sesje czytają tę
  samą wartość przed zapisaniem którejkolwiek z nich.
- `FOR UPDATE` trzyma blokadę do końca transakcji, nie do końca
  statementu — długa transakcja z `FOR UPDATE` na początku blokuje inne
  sesje przez cały swój czas trwania, nie tylko na chwilę odczytu.
- Domyślny `innodb_lock_wait_timeout` to 50 sekund — sesja czekająca na
  zwykłą blokadę (nie deadlock) czeka realnie aż tyle, chyba że limit
  zostanie obniżony na tę sesję.
- Deadlock (`1213`, wykryty natychmiast przez graf oczekiwania) i zwykły
  timeout blokady (`1205`, `ER_LOCK_WAIT_TIMEOUT`, po prostu upłynięty
  czas) to dwa różne mechanizmy z różnymi kodami błędu — obsługa jednego
  nie łapie drugiego.
- Po deadlocku InnoDB wycofuje **całą** transakcję ofiary, nie tylko
  ostatni statement — retry musi zacząć się od `START TRANSACTION`, a nie
  próbować dokończyć w miejscu przerwania.

## Źródła (audyt 2026-07-18, MySQL 8.4)

- [InnoDB Transaction Isolation Levels](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
- [Locking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html)
- [InnoDB Deadlocks](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks.html)
- [InnoDB Locking](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html)
- [innodb_lock_wait_timeout](https://dev.mysql.com/doc/refman/8.4/en/innodb-parameters.html#sysvar_innodb_lock_wait_timeout)
