# Dodaj histogram rozkładu statusów

Wygeneruj histogram statusu z 16 bucketami, aby optimizer znał silnie nierówny rozkład bez indeksu na statusie.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
