# Przetestuj invisible index przed publikacją

Dodaj ix_orders_candidate jako INVISIBLE i włącz go tylko dla jednej instrukcji EXPLAIN przez SET_VAR.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
