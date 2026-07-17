# Rozdziel nazwę etapami

Dodaj given_name i family_name do istniejących customers, wykonaj backfill z name i dopiero potem ustaw obie kolumny NOT NULL. Stare name pozostaje do osobnego contract deployu.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
