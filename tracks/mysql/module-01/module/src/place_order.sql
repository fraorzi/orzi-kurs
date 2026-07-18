CREATE PROCEDURE place_order(
  IN p_order_id BIGINT,
  IN p_request_id VARCHAR(80),
  IN p_listing_id BIGINT,
  IN p_quantity INT
)
BEGIN
  DECLARE available INT;
  DECLARE current_price DECIMAL(12,2);
  SELECT stock, price INTO available, current_price
  FROM listings WHERE id = p_listing_id;
  DO SLEEP(0.12);
  IF available < p_quantity THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'insufficient stock';
  END IF;
  INSERT INTO orders(id, request_id) VALUES (p_order_id, p_request_id);
  INSERT INTO order_items VALUES (p_order_id, p_listing_id, p_quantity, current_price);
  UPDATE listings SET stock = available - p_quantity WHERE id = p_listing_id;
END
