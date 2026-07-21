SELECT o.id, c.email FROM orders AS o INNER JOIN customers AS c ON c.id = o.customer_id ORDER BY o.id;
