SELECT c.id, COALESCE(SUM(o.total), 0) AS paid_total
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.id
  AND o.status = 'paid'
GROUP BY c.id
ORDER BY c.id;
