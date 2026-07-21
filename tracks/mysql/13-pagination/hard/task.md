# Hard — ogranicz cursor do tenanta i podeprzyj indeksem

Feed jest per-tenant: klient widzi wyłącznie własne posty, a strona ma
respektować to ograniczenie tak samo rygorystycznie jak samą paginację. Sam
cursor keyset z zadania medium nie wystarcza — bez filtra `tenant_id` w tej
samej klauzuli `WHERE` co warunek kursora, post innego najemcy, który akurat
mieści się w przedziale czasowym kursora, przecieka do wyniku.

## Wymagania

- Dodaj indeks `ix_posts_feed(tenant_id, created_at, id)` — w tej
  kolejności: równość (`tenant_id`) najpierw, potem kolumny porządkujące
  kursora.
- Zapytanie filtruje `tenant_id = 1` ORAZ `(created_at, id) < ('2026-01-04
  10:00:00', 2)` w tym samym `WHERE` — pominięcie filtra tenanta ujawnia
  posty innych najemców mieszczące się w oknie czasowym kursora.
- `ORDER BY created_at DESC, id DESC LIMIT 3` — identyczne z warunkiem
  kursora, tak jak w zadaniu medium.
- Gdy najemca nie ma żadnych postów spełniających warunek kursora, strona
  jest pusta — nawet jeśli inni najemcy mają pasujące wiersze.
