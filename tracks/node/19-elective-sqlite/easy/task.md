# Easy - zbuduj parametryzowane zapytanie

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Lista jobów z filtrowaniem od użytkownika. Zaimplementuj `solve(filter)`
budujące `{ sql, params }`:

- `filter.status` (opcjonalny) trafia **wyłącznie** do `params` jako
  `$status` - nigdy do tekstu SQL;
- `filter.order` przechodzi przez allow-listę `created_at`/`priority`
  (domyślnie `created_at`); spoza listy → `Error` - identyfikatorów nie da
  się sparametryzować, stąd inna obrona;
- `filter.limit` domyślnie 50, całkowity, zakres 1-100, do `params` jako
  `$limit`;
- kształt SQL: `SELECT * FROM jobs[ WHERE status = $status] ORDER BY
  <order> DESC LIMIT $limit`.
