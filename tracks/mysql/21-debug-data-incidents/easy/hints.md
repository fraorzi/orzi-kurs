## Hint 1

`WHERE` wykonuje się logicznie po złączeniu — dla klienta bez pasującego
zamówienia `o.status` jest `NULL`, a `NULL = 'paid'` daje `UNKNOWN`;
`WHERE` odrzuca ten wiersz, zanim `COALESCE` zdąży zamienić `NULL` na `0`.

## Hint 2

Warunek dotyczący opcjonalnej relacji (czy zamówienie jest `'paid'`)
należy do `ON`, nie do `WHERE` — `ON o.customer_id = c.id AND o.status =
'paid'` filtruje **przed** rozszerzeniem `NULL`, nie po nim.

## Hint 3

Kształt: `LEFT JOIN orders o ON o.customer_id = c.id AND o.status =
'paid'`, żadnego warunku o `status` w `WHERE`; `COALESCE(SUM(o.total), 0)`
zostaje bez zmian.
