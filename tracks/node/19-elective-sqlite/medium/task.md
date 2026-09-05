# Medium - wykonaj transakcję z rollbackiem

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Przelew między kontami przez wstrzyknięty adapter synchronicznego SQLite.
Zaimplementuj `solve(db, from, to, amount)`:

- `amount` musi być skończone i dodatnie, inaczej `Error` (przed dotknięciem
  bazy);
- otwórz transakcję `BEGIN IMMEDIATE`;
- debet: `UPDATE ... SET balance = balance - ? WHERE id = ? AND balance >= ?`
  - warunek środków siedzi w SQL, a `changes !== 1` oznacza brak środków
  (`Error`); to eliminuje wyścig SELECT-przed-UPDATE;
- kredyt: analogiczny UPDATE; `changes !== 1` = brak konta docelowego;
- sukces kończy `COMMIT`; **każdy** błąd wykonuje `ROLLBACK` i leci dalej.
