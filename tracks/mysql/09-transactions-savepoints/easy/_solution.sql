START TRANSACTION;
UPDATE accounts SET balance = balance - 30.00 WHERE id = 1;
UPDATE accounts SET balance = balance + 30.00 WHERE id = 2;
INSERT INTO ledger (from_id, to_id, amount) VALUES (1, 2, 30.00);
COMMIT;
