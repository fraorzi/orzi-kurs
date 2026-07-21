## Hint 1

Deadlock rollbackuje całą transakcję wybraną jako ofiara — powtórzenie
tylko ostatniej instrukcji w tej samej, już wycofanej transakcji nie ma
sensu; trzeba zacząć od `BEGIN` na nowym połączeniu.

## Hint 2

Sprawdź `errno` błędu: retryable to wyłącznie `1213` i `1205`. Każdy inny
błąd (np. `1062` duplikat) ma przerwać pętlę i polecieć dalej z pierwszej
próby — bez ponawiania.

## Hint 3

Pętla `for (attempt = 1..maxAttempts)`: w każdej iteracji nowy
`pool.getConnection()`, `beginTransaction()`, wywołanie całego `work`,
`commit()` na sukces; w `catch` `rollback()` i `if (!retryable ||
attempt === maxAttempts) throw error`; `release()` zawsze w `finally`.
