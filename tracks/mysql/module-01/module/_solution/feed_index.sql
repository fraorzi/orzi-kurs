CREATE INDEX ix_listings_feed
  ON listings(seller_id, created_at, id);
