CREATE TABLE sellers (
  id BIGINT PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);

CREATE TABLE listings (
  id BIGINT PRIMARY KEY,
  seller_id BIGINT NOT NULL,
  public_id CHAR(26),
  price DECIMAL(12,2) NOT NULL,
  stock INT NOT NULL,
  created_at DATETIME(6) NOT NULL,
  FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  request_id VARCHAR(80) UNIQUE,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE order_items (
  order_id BIGINT,
  listing_id BIGINT,
  quantity INT,
  unit_price DECIMAL(12,2)
);

CREATE INDEX ix_listings_feed ON listings(created_at, id);

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
