CREATE INDEX ix_orders_cover ON orders(tenant_id, status, created_at, id);
