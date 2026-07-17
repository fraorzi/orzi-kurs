# Usuń niesargowalny predykat

Zwróć EXPLAIN ANALYZE dla zdarzeń z 10 stycznia 2025 tak, aby możliwy był range scan po ix_events_created.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
