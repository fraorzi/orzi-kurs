# Zbuduj idempotentną fixture

Zaimplementuj seedUsers z jawnymi identyfikatorami. Wielokrotne uruchomienie ma odtwarzać kanoniczne wartości bez duplikatów.

## Kryteria akceptacji

- Kod przechodzi strict TypeScript i wykonuje test integracyjny na MySQL 8.4.
- Połączenia, transakcje i błędy zachowują się poprawnie również poza happy pathem.
