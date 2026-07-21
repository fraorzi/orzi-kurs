CREATE TABLE order_items (id BIGINT PRIMARY KEY, quantity INT NOT NULL, CONSTRAINT chk_order_items_quantity_positive CHECK (quantity > 0));
