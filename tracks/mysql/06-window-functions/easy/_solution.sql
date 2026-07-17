SELECT id, customer_id, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC, id DESC) AS position FROM orders ORDER BY customer_id, position;
