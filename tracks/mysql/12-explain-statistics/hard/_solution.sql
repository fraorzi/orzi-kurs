ALTER TABLE orders ADD INDEX ix_orders_candidate(customer_id, created_at) INVISIBLE;
