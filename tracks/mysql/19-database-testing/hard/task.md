# Zakoduj kontrakt migracji na danych legacy

Zaimplementuj migrateUserEmails: expand nullable, backfill LOWER(TRIM(email)), potem NOT NULL i UNIQUE. Test jest uruchamiany na starych rekordach.

## Kryteria akceptacji

- Kod przechodzi strict TypeScript i wykonuje test integracyjny na MySQL 8.4.
- Połączenia, transakcje i błędy zachowują się poprawnie również poza happy pathem.
