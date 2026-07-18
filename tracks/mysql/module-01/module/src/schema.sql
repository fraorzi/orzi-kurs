CREATE TABLE sellers (
  id BIGINT PRIMARY KEY,
  name VARCHAR(120) NOT NULL
);

CREATE TABLE listings (
  id BIGINT PRIMARY KEY,
  seller_id BIGINT NOT NULL,
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

CREATE TABLE schema_migrations (
  version VARCHAR(80) PRIMARY KEY,
  applied_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);
