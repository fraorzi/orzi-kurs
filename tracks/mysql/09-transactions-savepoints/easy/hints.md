## Hint 1

Starter zmienia tylko saldo nadawcy — brakuje analogicznego `UPDATE` dla
odbiorcy. Wyznacz jedną granicę `START TRANSACTION ... COMMIT` wokół
wszystkich trzech zmian.

## Hint 2

Saldo odbiorcy jest tak samo istotne jak obciążenie nadawcy — dodaj drugi
`UPDATE accounts SET balance = balance + 30.00 WHERE id = 2` obok
istniejącego obciążenia konta 1.

## Hint 3

Po `COMMIT` połączenie nie może zostać w otwartej transakcji — test
sprawdza to przez `information_schema.innodb_trx` (brak wiersza dla
bieżącego połączenia). Brakujący albo przedwcześnie umieszczony `COMMIT`
to najczęstsza przyczyna niespodzianki tutaj.
