# Zbuduj covering index

Dodaj ix_orders_cover, aby feed mógł zwrócić id,total bez odczytu pełnego rekordu tabeli.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
