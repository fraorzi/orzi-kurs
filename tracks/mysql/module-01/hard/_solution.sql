CREATE TABLE sellers (
  id BIGINT PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);

CREATE TABLE listings (
  id BIGINT PRIMARY KEY,
  seller_id BIGINT NOT NULL,
  price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
  stock INT NOT NULL CHECK (stock >= 0),
  created_at DATETIME(6) NOT NULL,
  CONSTRAINT fk_listings_seller
    FOREIGN KEY (seller_id) REFERENCES sellers(id) ON DELETE RESTRICT
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  request_id VARCHAR(80) NOT NULL UNIQUE,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

CREATE TABLE order_items (
  order_id BIGINT NOT NULL,
  listing_id BIGINT NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(12,2) NOT NULL CHECK (unit_price >= 0),
  PRIMARY KEY (order_id, listing_id),
  CONSTRAINT fk_items_order
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_items_listing
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE RESTRICT
);

CREATE TABLE schema_migrations (
  version VARCHAR(80) PRIMARY KEY,
  applied_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

ALTER TABLE listings
  ADD COLUMN public_id CHAR(26) NULL,
  ALGORITHM=INSTANT;
ALTER TABLE listings
  ADD CONSTRAINT uq_listings_public_id UNIQUE (public_id),
  ALGORITHM=INPLACE,
  LOCK=NONE;
INSERT INTO schema_migrations(version)
VALUES ('20260717_add_listing_public_id');

CREATE INDEX ix_listings_feed
  ON listings(seller_id, created_at, id);

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
