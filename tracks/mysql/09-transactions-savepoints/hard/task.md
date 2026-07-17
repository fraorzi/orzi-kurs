# Wycofaj całość po błędzie procedury

Utwórz procedurę transfer_funds. Przy dowolnym błędzie ma wycofać całą transakcję i przekazać błąd klientowi przez RESIGNAL.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
