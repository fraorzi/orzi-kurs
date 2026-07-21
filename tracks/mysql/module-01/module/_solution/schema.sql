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
