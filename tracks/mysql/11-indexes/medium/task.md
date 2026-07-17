# Dobierz kolejność indeksu złożonego

Dodaj ix_orders_feed wspierający równości tenant/status i porządek created_at,id.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
