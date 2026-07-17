# Zablokuj stan przed rezerwacją

Utwórz reserve_stock z SELECT ... FOR UPDATE, aby dwa równoległe żądania nie zatwierdziły rezerwacji tego samego zapasu.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
