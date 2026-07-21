# Hard — przetestuj invisible index przed publikacją

Chcesz sprawdzić, czy nowy indeks `(customer_id, created_at)` faktycznie
przyspieszy zapytanie z panelu klienta, zanim opublikujesz go zespołowi.
Publikacja widocznego indeksu od razu wpływa na wybór planu przez wszystkie
zapytania — jeśli okaże się zły, trzeba go usuwać pod produkcyjnym
obciążeniem. `INVISIBLE` pozwala dodać indeks, utrzymywać go przy każdym
zapisie, ale trzymać go poza zasięgiem optimizera, dopóki nie sprawdzisz go
punktowo.

## Wymagania

- Dodaj indeks `ix_orders_candidate(customer_id, created_at)` jako
  `INVISIBLE` — niewidoczny domyślnie w `information_schema.statistics`
  (`IS_VISIBLE = 'NO'`).
- Optimizer ma go pomijać w zwykłych zapytaniach — bez żadnej podpowiedzi
  `EXPLAIN SELECT ... WHERE customer_id = ?` ma wracać do pełnego skanu.
- Umożliw ocenę planu pojedynczej instrukcji przez
  `SET_VAR(optimizer_switch='use_invisible_indexes=on')` w hincie
  `/*+ ... */` — to włącza indeks tylko dla jednego `EXPLAIN`, bez zmiany
  globalnej sesji ani serwera.
- `FORCE INDEX` bez tego hinta ma kończyć się błędem — dla optimizera
  indeks "nie istnieje", dopóki nie zostanie jawnie odsłonięty.

To działa niezależnie od `sql_mode` — kontrakt dotyczy wyłącznie
widoczności indeksu dla optimizera, nie walidacji danych.
