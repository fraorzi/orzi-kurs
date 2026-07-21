ALTER TABLE products ADD COLUMN sku_normalized VARCHAR(64) NULL; CREATE UNIQUE INDEX uq_products_sku_normalized ON products(sku);
