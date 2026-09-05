# Easy [O] - zamień pełny index scan na range scan

Tryb: optymalizacja. Popraw istniejący kod w `starter.sql`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

Raport dzienny filtruje `events` po dacie: `WHERE DATE(created_at) =
'2026-01-10'`. Wynik jest poprawny - problem w tym, że `DATE(...)` na
indeksowanej kolumnie nie jest **sargowalne**: silnik musi wyliczyć
funkcję dla każdego wpisu indeksu, więc `ix_events_created` nie daje
dostępu `range`, tylko pełny przegląd indeksu (`type: index`), rosnący
liniowo z rozmiarem tabeli, nie z rozmiarem jednego dnia.

Przepisz `starter.sql` tak, aby:

- zwracał dokładnie te same `id`, co oryginalne zapytanie - wynik dla
  10 stycznia 2026, nic więcej i nic mniej,
- zapisywał dzień jako półotwarty zakres na surowej kolumnie
  (`created_at >= '2026-01-10' AND created_at < '2026-01-11'`) -
  wiersz o północy następnego dnia ma pozostać wykluczony,
- pozwalał optymalizatorowi użyć dostępu `range` po `ix_events_created`
  (widoczne w `EXPLAIN` jako `type = range`, `key = ix_events_created`),
- ograniczał liczbę przeglądanych wierszy do rzędu wielkości jednego dnia
  (dziesiątki), nie całej tabeli (setki/tysiące).

Ten temat ocenia **dwie osobne bramki**: testy poprawności (bez
oznaczenia) muszą przechodzić już na starterze - zapytanie ze starteru
zwraca prawidłowy wynik, tylko robi to drogo. Testy `[quality]` mają na
starterze **oblewać** i przejść dopiero po Twojej zmianie; dowód opiera
się wyłącznie na `EXPLAIN` (typ dostępu, użyty indeks, liczba
przeglądanych wierszy), nigdy na pomiarze czasu.
