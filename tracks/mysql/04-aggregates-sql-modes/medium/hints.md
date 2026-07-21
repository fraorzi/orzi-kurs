## Hint 1

`WHERE` widzi pojedyncze wiersze, zanim powstaną grupy — w tym miejscu
nie istnieje jeszcze żaden wynik `SUM`. Starter próbuje użyć `SUM` w
`WHERE`, więc MySQL odrzuca zapytanie błędem 1111, zanim cokolwiek
policzy.

## Hint 2

Filtr po statusie (`status = 'paid'`) zostaw w `WHERE` — to warunek na
surowym wierszu. Filtr po sumie zamówień przenieś do `HAVING`, które
działa już po `GROUP BY`, na gotowych agregatach.

## Hint 3

Kształt: `WHERE status = 'paid' GROUP BY customer_id HAVING
SUM(total) >= 100 ORDER BY customer_id`. Klient z sumą dokładnie `100`
powinien zostać w wyniku — `>=` jest domknięte z tej strony.
