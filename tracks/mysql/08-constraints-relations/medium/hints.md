## Hint 1

Starter ma politykę na odwrót: `orders → customers` kaskaduje (usunięcie
klienta cicho kasuje jego zamówienia), a `order_items → orders` nie ma
żadnej polityki usunięcia w ogóle.

## Hint 2

Historia zamówień klienta zwykle nie powinna zniknąć razem z kontem —
`ON DELETE RESTRICT` (domyślne zachowanie MySQL, ale warto zapisać jawnie)
na `orders.customer_id`. Pozycje zamówienia nie mają sensu bez zamówienia
— `ON DELETE CASCADE` na `order_items.order_id`.

## Hint 3

Kształt: `FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE
RESTRICT` w `orders`, `FOREIGN KEY (order_id) REFERENCES orders(id) ON
DELETE CASCADE` w `order_items`. Sprawdź osobno: klient z zamówieniem nie
daje się usunąć, klient bez zamówień — tak.
