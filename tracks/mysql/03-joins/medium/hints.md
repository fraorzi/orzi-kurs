## Hint 1

Starter ma `status = 'paid'` w `WHERE`, czyli po tym, jak `LEFT JOIN`
już dołożył wiersze z NULL dla klientów bez dopasowania. `WHERE`
porównuje `NULL = 'paid'` do UNKNOWN i odrzuca taki wiersz — `LEFT
JOIN` po cichu zachowuje się jak `INNER JOIN`.

## Hint 2

Warunek opcjonalnej relacji (`status = 'paid'`) przenieś do `ON`, obok
`o.customer_id = c.id`. Wtedy niedopasowane albo niepasujące pod
warunkiem wiersze `orders` nadal istnieją w wyniku joina jako NULL —
`COUNT(o.id)` policzy je jako zero, nie usunie wiersza klienta.

## Hint 3

Kształt: `FROM customers c LEFT JOIN orders o ON o.customer_id = c.id
AND o.status = 'paid' GROUP BY c.id`. Test z klientem, który ma
wyłącznie anulowane zamówienia (nie zero zamówień, tylko zero
_opłaconych_) pokaże, czy warunek naprawdę siedzi w `ON`.
