SELECT c.id, COALESCE((SELECT SUM(o.total) FROM orders o WHERE o.customer_id=c.id),0) AS total FROM customers c ORDER BY c.id;
