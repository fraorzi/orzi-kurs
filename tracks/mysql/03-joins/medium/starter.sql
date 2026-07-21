SELECT c.id, COUNT(o.id) AS paid_count FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.status = 'paid' GROUP BY c.id ORDER BY c.id;
