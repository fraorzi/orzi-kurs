# Parametryzuj lookup i typuj RowDataPacket

Zaimplementuj findUserByEmail przez pool.execute z markerem ?. Zwracaj User lub null bez interpolowania danych do SQL.

## Kryteria akceptacji

- Kod przechodzi strict TypeScript i wykonuje test integracyjny na MySQL 8.4.
- Połączenia, transakcje i błędy zachowują się poprawnie również poza happy pathem.
