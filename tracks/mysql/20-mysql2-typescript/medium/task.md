# Utrzymaj zamówienie na jednym PoolConnection

Zaimplementuj createOrder. Order i wszystkie items są jedną transakcją; przy błędzie wykonaj rollback, a połączenie zawsze release.

## Kryteria akceptacji

- Kod przechodzi strict TypeScript i wykonuje test integracyjny na MySQL 8.4.
- Połączenia, transakcje i błędy zachowują się poprawnie również poza happy pathem.
