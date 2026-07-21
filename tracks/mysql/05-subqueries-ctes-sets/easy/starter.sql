SELECT c.id FROM customers c JOIN orders o ON o.customer_id = c.id WHERE o.status = 'paid' ORDER BY c.id;
