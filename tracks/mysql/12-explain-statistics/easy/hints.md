## Hint 1

`DATE(created_at)` owija kolumnę w funkcję — optimizer traci możliwość
range scan po indeksie, bo nie umie odwrócić funkcji na predykat zakresu.

## Hint 2

Zapisz dzień jako przedział półotwarty: `created_at >= '...' AND created_at
< '...'` (bez `CURDATE()`/`NOW()` — literały dat są stałe).

## Hint 3

Użyj `EXPLAIN ANALYZE` (nie `EXPLAIN`). W planie szukaj `range scan` po
`ix_events_created` i `actual ... rows=24` bez towarzyszącego `rows=5000`
(to byłby ślad pełnego skanu indeksu).
