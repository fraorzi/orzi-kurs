ALTER TABLE products
  ADD COLUMN sku_normalized VARCHAR(64)
    GENERATED ALWAYS AS (LOWER(TRIM(sku))) STORED;

CREATE UNIQUE INDEX uq_products_sku_normalized
  ON products(sku_normalized);
