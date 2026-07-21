CREATE PROCEDURE reserve_stock(IN p_request VARCHAR(20), IN p_sku VARCHAR(20), IN p_qty INT)
BEGIN
  DECLARE available INT;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;
  START TRANSACTION;
  SELECT quantity INTO available FROM inventory WHERE sku = p_sku;
  DO SLEEP(0.15);
  IF available < p_qty THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'insufficient stock';
  END IF;
  UPDATE inventory SET quantity = available - p_qty WHERE sku = p_sku;
  INSERT INTO reservations(request_id, sku, quantity) VALUES (p_request, p_sku, p_qty);
  COMMIT;
END
