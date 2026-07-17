# Wykonaj expand i backfill telefonu

Do istniejącej tabeli users dodaj phone_e164, uzupełnij dane, a dopiero potem wymuś NOT NULL i UNIQUE.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
