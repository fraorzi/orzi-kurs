# Zamień OFFSET na cursor keyset

Kursor wskazuje (2026-01-02 10:00:00, id=5). Zwróć maksymalnie trzy kolejne rekordy w porządku malejącym.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
