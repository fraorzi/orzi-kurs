## Hint 1

Starter zwraca też konta nieaktywne — problemem jest brak filtra
wierszy, nie projekcja ani sortowanie.

## Hint 2

Warunek logiczny należy do `WHERE`: `WHERE active = TRUE` (BOOLEAN
w MySQL to TINYINT, więc zadziała też samo `WHERE active`).

## Hint 3

Kształt rozwiązania: `SELECT id, email FROM users WHERE ... ORDER BY id`.
Test z samymi nieaktywnymi kontami musi zwrócić zero wierszy — jeżeli
coś zwraca, filtra wciąż nie ma.
