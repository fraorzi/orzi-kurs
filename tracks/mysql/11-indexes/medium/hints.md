## Hint 1

Kolumny równości (`tenant_id`, `status`) zawężają wynik i powinny stać
pierwsze — dopiero po nich ma sens kolumna, która utrzymuje porządek
sortowania.

## Hint 2

Starter zaczyna od `created_at` — to kolumna sortująca, nie równości,
więc `tenant_id` przestaje być leworęcznym prefiksem i traci dostęp
`ref`. Zamień kolejność: równości najpierw, porządek na końcu.

## Hint 3

Oczekiwany prefiks to `tenant_id, status, created_at, id` — sprawdź
`EXPLAIN ... FORCE INDEX(ix_orders_feed) WHERE tenant_id=1 AND
status='paid' ORDER BY created_at DESC, id DESC`: `Extra` nie powinien
zawierać `Using filesort`.
