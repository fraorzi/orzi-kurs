CREATE TABLE customers (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY,
  public_id CHAR(26) NOT NULL UNIQUE,
  customer_id BIGINT NOT NULL,
  customer_email_snapshot VARCHAR(255) NOT NULL,
  total DECIMAL(12,2) NOT NULL CHECK (total >= 0),
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  CONSTRAINT fk_orders_customer
    FOREIGN KEY (customer_id) REFERENCES customers(id)
    ON DELETE RESTRICT
);
