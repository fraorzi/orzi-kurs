# Przenieś saldo atomowo

Przenieś 30.00 z konta 1 na konto 2 i zapisz ledger. Wszystkie trzy zmiany mają zostać zatwierdzone jako jedna transakcja.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
