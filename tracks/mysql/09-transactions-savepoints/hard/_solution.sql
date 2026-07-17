CREATE PROCEDURE transfer_funds(IN p_from INT, IN p_to INT, IN p_amount DECIMAL(10,2))
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
  UPDATE accounts SET balance = balance + p_amount WHERE id = p_to;
  UPDATE accounts SET balance = balance - p_amount WHERE id = p_from;
  INSERT INTO ledger(from_id, to_id, amount) VALUES (p_from, p_to, p_amount);
  COMMIT;
END
