# Easy — usuń niesargowalny predykat z EXPLAIN ANALYZE

Dashboard operacyjny filtruje zdarzenia z konkretnego dnia; ktoś napisał
`WHERE DATE(created_at) = '2025-01-10'`, bo to najczytelniejszy zapis dnia.
Tabela `events` ma indeks `ix_events_created(created_at)`, ale
`DATE(created_at)` owija kolumnę w funkcję — optimizer nie może już użyć
indeksu do zawężenia zakresu, tylko skanuje go w całości i dopiero filtruje
wynik. To zapytanie trafia w dashboard SRE co rano, więc koszt pełnego
skanu jest realny i powtarzalny.

## Wymagania

- Napisz `EXPLAIN ANALYZE` (nie samo `EXPLAIN`) dla zapytania zwracającego
  `id` zdarzeń z 10 stycznia 2025.
- Zamień `DATE(created_at) = '2025-01-10'` na przedział półotwarty
  `created_at >= '2025-01-10' AND created_at < '2025-01-11'` — to jedyny
  zapis, który zostawia `created_at` bez opakowania w funkcję.
- Plan wykonania ma pokazać range scan po `ix_events_created`, nie pełny
  skan indeksu.
- Granica dnia jest półotwarta: wiersz z `2025-01-11 00:00:00` nie należy
  już do 10 stycznia.

Literały dat są stałe (bez `NOW()`/`CURDATE()`), więc wynik jest
deterministyczny niezależnie od strefy czasowej serwera testowego.
