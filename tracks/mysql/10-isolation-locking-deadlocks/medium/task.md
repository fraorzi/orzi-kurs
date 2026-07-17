# Utrzymaj spójny snapshot

Rozpocznij transakcję REPEATABLE READ i wykonaj pierwszy odczyt liczby otwartych ticketów, aby kolejne consistent reads nie zobaczyły phantomu.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
