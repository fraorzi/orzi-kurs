# Ogranicz cursor do tenanta i podeprzyj indeksem

Dodaj ix_posts_feed(tenant_id,created_at,id) i zwróć kolejne trzy posty tenanta 1 po cursorze (2026-01-04 10:00:00,2).

## Kryteria akceptacji

- SQL działa na MySQL 8.4 i zachowuje wskazany niezmiennik także przy błędzie lub współbieżności.
- Rozwiązanie nie wyłącza constraints ani globalnych zabezpieczeń serwera.
