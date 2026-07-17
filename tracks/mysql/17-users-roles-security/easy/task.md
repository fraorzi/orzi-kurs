# Zbuduj domyślną rolę tylko do odczytu

Utwórz rolę orzi_app_reader z SELECT wyłącznie na app_data.*, przypisz ją kontu orzi_app_api@localhost i aktywuj jako default role.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
