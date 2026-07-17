# Audytuj tylko rzeczywistą zmianę statusu

Utwórz AFTER UPDATE trigger orders_status_audit. Zapisuj old/new status tylko wtedy, gdy wartości rzeczywiście się różnią.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
