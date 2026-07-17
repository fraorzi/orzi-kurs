# Ponów całą transakcję po deadlocku

Utwórz move_stock z ograniczonym retry. Dwie operacje blokujące rekordy w odwrotnej kolejności mają obie zakończyć się sukcesem po automatycznym wyborze ofiary przez InnoDB.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
