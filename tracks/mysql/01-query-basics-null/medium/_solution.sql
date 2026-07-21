SELECT id FROM orders WHERE status = 'open' AND shipped_at IS NULL ORDER BY id;
