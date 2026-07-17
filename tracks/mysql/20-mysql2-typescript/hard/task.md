# Ponów całą transakcję mysql2 po deadlocku

Zaimplementuj withTransactionRetry z maksymalnie trzema próbami dla errno 1213/1205. Każda próba pobiera sesję, zaczyna od nowa i zawsze ją zwalnia.

## Kryteria akceptacji

- Kod przechodzi strict TypeScript i wykonuje test integracyjny na MySQL 8.4.
- Połączenia, transakcje i błędy zachowują się poprawnie również poza happy pathem.
