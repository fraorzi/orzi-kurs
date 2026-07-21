## Hint 1

Starter łączy tabele przecinkiem w `FROM` bez żadnego warunku — to
iloczyn kartezjański, nie join. Każde zamówienie trafia w parę z
każdym klientem, niezależnie od `customer_id`.

## Hint 2

Warunek relacji `customer_id = customers.id` należy do `ON`, razem ze
słowem kluczowym `INNER JOIN`. `INNER JOIN` zachowuje tylko pary, dla
których warunek w `ON` jest prawdziwy — wiersze bez dopasowania (NULL
albo nieistniejący klient) odpadają same.

## Hint 3

Kształt: `SELECT o.id, c.email FROM orders o INNER JOIN customers c ON
c.id = o.customer_id ORDER BY o.id`. Zamówienie z `customer_id`
wskazującym na nieistniejący rekord w `customers` powinno zniknąć z
wyniku równie cicho jak zamówienie z `customer_id = NULL`.
