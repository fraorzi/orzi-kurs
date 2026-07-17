# Indeksuj kanoniczną wartość wygenerowaną

Dodaj STORED sku_normalized jako LOWER(TRIM(sku)) i UNIQUE index, aby wszystkie klienty dzieliły ten sam niezmiennik.

## Kryteria akceptacji

- Rozwiązanie działa na MySQL 8.4 i ogranicza zakres ukrytej logiki lub uprawnień.
- Test sprawdza zachowanie wykonywalne albo stan metadanych serwera, nie tylko obecność słowa kluczowego.
