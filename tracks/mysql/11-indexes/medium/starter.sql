CREATE INDEX ix_orders_feed ON orders(created_at, tenant_id, status, id);
