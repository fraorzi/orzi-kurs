## Hint 1

Starter porównuje przychód klienta ze stałą liczbą `70` — to zgadywanie
progu, nie liczenie średniej. Utwórz najpierw relację `revenue` per
klient jako osobny, nazwany etap (`WITH revenue AS (...)`).

## Hint 2

Średnia ma powstać z wierszy `revenue` (jeden wiersz na klienta), nie
z surowych `orders` (jeden wiersz na zamówienie) — inaczej klient z
wieloma małymi zamówieniami waży w średniej tyle samo, co jedno duże
zamówienie innego klienta.

## Hint 3

Kształt: `WITH revenue AS (SELECT customer_id, SUM(total) AS total
FROM orders GROUP BY customer_id), average_revenue AS (SELECT
AVG(total) AS value FROM revenue) SELECT customer_id, total AS revenue
FROM revenue CROSS JOIN average_revenue WHERE total > value ORDER BY
customer_id`. Zmień dane wejściowe tak, by średnia wypadła powyżej 70
— starter powinien się rozjechać z wynikiem.
