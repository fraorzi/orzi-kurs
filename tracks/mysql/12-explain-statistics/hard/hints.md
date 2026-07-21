## Hint 1

Nie usuwaj ani nie publikuj indeksu na oślep — dodaj go tak, żeby nie
wpływał na plany innych zapytań, dopóki go nie ocenisz.

## Hint 2

`ALTER TABLE orders ADD INDEX ix_orders_candidate(customer_id, created_at)
INVISIBLE`.

## Hint 3

Do jednorazowej oceny planu użyj
`/*+ SET_VAR(optimizer_switch='use_invisible_indexes=on') */` w samym
`EXPLAIN` — nie zmieniaj globalnego `optimizer_switch` sesji.
