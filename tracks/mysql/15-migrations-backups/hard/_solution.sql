-- Preflight: mysqldump --single-transaction app orders > orders-before-20260717.sql
-- Restore drill: mysql restore_check < orders-before-20260717.sql
-- Verify restore_check row counts and a representative checksum before rollout.
CREATE TABLE IF NOT EXISTS schema_migrations(version VARCHAR(80) PRIMARY KEY, applied_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6));
ALTER TABLE orders ADD COLUMN source VARCHAR(20) NOT NULL DEFAULT 'web', ALGORITHM=INSTANT;
INSERT INTO schema_migrations(version) VALUES ('20260717_add_orders_source');
