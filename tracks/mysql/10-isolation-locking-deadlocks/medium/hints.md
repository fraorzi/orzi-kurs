## Hint 1

Starter ustawia `READ COMMITTED` — każdy kolejny odczyt w tej samej
transakcji dostaje świeżą migawkę, więc drugi `SELECT COUNT(*)` zobaczy
nowo zatwierdzony wiersz drugiej sesji. Potrzebny jest poziom izolacji,
w którym cała transakcja trzyma się jednej migawki.

## Hint 2

Poziom izolacji ustaw przed `START TRANSACTION`:
`SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;` — w MySQL to właśnie
`REPEATABLE READ` (domyślny poziom serwera) ustanawia migawkę przy
pierwszym spójnym odczycie i trzyma się jej przez całą transakcję.

## Hint 3

Kształt: `SET TRANSACTION ISOLATION LEVEL REPEATABLE READ; START
TRANSACTION; SELECT COUNT(*) FROM tickets WHERE status = 'open';`. Test
sprawdza to na dwóch kolejnych odczytach po dwóch osobnych committed
insertach drugiej sesji — oba mają dać tę samą liczbę co pierwszy odczyt.
