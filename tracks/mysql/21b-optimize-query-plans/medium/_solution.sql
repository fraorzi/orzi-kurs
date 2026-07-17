SELECT c.id, COALESCE(SUM(o.total),0) AS total FROM customers c LEFT JOIN orders o ON o.customer_id=c.id GROUP BY c.id ORDER BY c.id;
