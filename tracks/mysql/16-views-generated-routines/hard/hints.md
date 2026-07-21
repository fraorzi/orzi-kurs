## Hint 1

Starter wstawia do `order_status_audit` bezwarunkowo przy każdym `UPDATE` —
zmiana notatki albo masowy `UPDATE` dotykający wielu zamówień naraz generuje
wpisy, które nie opisują żadnej realnej zmiany statusu.

## Hint 2

Warunek `OLD.status <> NEW.status` wygląda poprawnie, dopóki status nie jest
`NULL` — trójwartościowa logika SQL sprawia, że porównanie z `NULL` daje
`NULL` (falsz w `IF`), więc pierwsze nadanie statusu ("był `NULL`, jest
`'new'`") zostałoby po cichu pominięte. `<=>` porównuje `NULL`-e jak zwykłe
wartości.

## Hint 3

Kształt: `IF NOT (OLD.status <=> NEW.status) THEN INSERT INTO
order_status_audit(...) VALUES (NEW.id, OLD.status, NEW.status); END IF;` —
`FOR EACH ROW` sprawia, że warunek liczy się osobno dla każdego wiersza
masowego `UPDATE`.
