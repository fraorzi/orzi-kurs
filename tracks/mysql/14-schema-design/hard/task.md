# Zachowaj historyczny snapshot zamówienia

Utwórz customers i orders. Zamówienie wskazuje klienta, ale przechowuje też niezmienny email_snapshot, publiczny identyfikator i poprawną kwotę DECIMAL.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
