# Odbierz niebezpieczną capability po incydencie

Rola orzi_writer ma omyłkowy DELETE. Odbierz go bez usuwania SELECT/UPDATE i ustaw rolę jako domyślną dla istniejącego użytkownika.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
