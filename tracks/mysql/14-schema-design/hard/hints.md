## Hint 1

Dane profilu klienta i dane dokumentu sprzedaży mają różną semantykę
czasu — jedno opisuje "teraz", drugie "wtedy".

## Hint 2

Snapshot jest jawnie nazwaną, zwykłą kolumną (`customer_email_snapshot`),
nie kolejnym kluczem obcym — nic go nie kaskaduje ani nie aktualizuje
automatycznie.

## Hint 3

Użyj `DECIMAL(12,2)` z `CHECK (total >= 0)`, `UNIQUE` na `public_id` i
`email`, oraz `FOREIGN KEY (customer_id) REFERENCES customers(id) ON
DELETE RESTRICT`.
