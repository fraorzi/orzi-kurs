CREATE PROCEDURE place_order(
  IN p_order_id BIGINT,
  IN p_request_id VARCHAR(80),
  IN p_listing_id BIGINT,
  IN p_quantity INT
)
BEGIN
  DECLARE available INT;
  DECLARE current_price DECIMAL(12,2);
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;
  SELECT stock, price INTO available, current_price
  FROM listings
  WHERE id = p_listing_id
  FOR UPDATE;
  DO SLEEP(0.12);
  IF available IS NULL OR available < p_quantity OR p_quantity <= 0 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'insufficient stock';
  END IF;
  INSERT INTO orders(id, request_id) VALUES (p_order_id, p_request_id);
  INSERT INTO order_items(order_id, listing_id, quantity, unit_price)
  VALUES (p_order_id, p_listing_id, p_quantity, current_price);
  UPDATE listings
  SET stock = stock - p_quantity
  WHERE id = p_listing_id;
  COMMIT;
END
