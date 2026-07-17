# Znormalizuj słownik statusów

Utwórz ticket_statuses i tickets. Status ticketa ma być wymaganym FK z ON UPDATE CASCADE oraz ON DELETE RESTRICT.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
