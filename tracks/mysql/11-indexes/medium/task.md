# Medium — dobierz kolejność indeksu złożonego

Feed zamówień pojedynczego najemcy filtruje po `tenant_id` i `status`
(dwie równości), a wynik sortuje malejąco po `created_at`, z `id` jako
tie-breakerem remisów czasu. Jeden dobrze uporządkowany indeks złożony
ma obsłużyć cały ten kształt zapytania — bez `filesort` i bez zbędnego
skanowania wierszy spoza najemcy.

Dodaj indeks `ix_orders_feed`, który:

- zaczyna się od kolumn równości w kolejności `tenant_id, status` — to
  one najbardziej zawężają wynik do wierszy jednego najemcy i jednego
  statusu,
- kończy się kolumnami porządkującymi `created_at, id` — w tej
  kolejności, zgodnie z `ORDER BY created_at DESC, id DESC` z zapytania,
- pozwala silnikowi obsłużyć `WHERE tenant_id = ? AND status = ? ORDER
  BY created_at DESC, id DESC` bez `Using filesort`,
- nie pomija żadnej z czterech kolumn — usunięcie którejkolwiek łamie
  leftmost prefix dla części zapytań korzystających z tego indeksu.

Kolejność kolumn w indeksie złożonym nie jest wymienna: indeks
`(created_at, tenant_id, status, id)` technicznie istnieje, ale nie daje
dostępu `ref` po `tenant_id`, bo `tenant_id` nie jest już leworęcznym
prefiksem.
