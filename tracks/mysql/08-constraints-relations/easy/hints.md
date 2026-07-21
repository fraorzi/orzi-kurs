## Hint 1

Starter ma tylko `NOT NULL` — to blokuje brak wartości, ale nie blokuje
`0` ani liczb ujemnych. Brakuje osobnej reguły na zakres wartości.

## Hint 2

`CHECK (quantity > 0)` dokłada regułę zakresu, ale sam w sobie nie
zastępuje `NOT NULL` — `NULL > 0` to UNKNOWN, nie FALSE, więc `CHECK`
samo w sobie przepuściłoby `NULL`, gdyby nie było też `NOT NULL`.

## Hint 3

Kształt: `quantity INT NOT NULL, CONSTRAINT chk_order_items_quantity_positive
CHECK (quantity > 0)`. Sprawdź osobno trzy przypadki: `1` przechodzi,
`0`/`-5` dają `ER_CHECK_CONSTRAINT_VIOLATED`, `NULL` daje inny kod —
`ER_BAD_NULL_ERROR`.
