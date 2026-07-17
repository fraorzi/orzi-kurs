# Ogranicz konto usługi

Utwórz orzi_service@localhost z REQUIRE SSL, limitem pięciu połączeń i wyłącznie SELECT/INSERT/UPDATE na app_data.*.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
