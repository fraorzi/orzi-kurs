SELECT id, customer_id, ROW_NUMBER() OVER (ORDER BY created_at DESC) AS position FROM orders ORDER BY customer_id, position;
