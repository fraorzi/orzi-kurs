# Przygotuj kontrolowany online rollout

Dodaj source przez ALGORITHM=INSTANT, zapisz wersję migracji i w komentarzu preflight udokumentuj mysqldump --single-transaction oraz restore do osobnej bazy restore_check.

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
