START TRANSACTION;
UPDATE inventory SET quantity = quantity - 2 WHERE sku = 'A';
SAVEPOINT optional_step;
INSERT INTO audit_log(kind) VALUES ('telemetry');
ROLLBACK;
INSERT INTO audit_log(kind) VALUES ('inventory_changed');
COMMIT;
