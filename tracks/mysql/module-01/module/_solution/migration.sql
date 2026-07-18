ALTER TABLE listings
  ADD COLUMN public_id CHAR(26) NULL,
  ALGORITHM=INSTANT;
ALTER TABLE listings
  ADD CONSTRAINT uq_listings_public_id UNIQUE (public_id),
  ALGORITHM=INPLACE,
  LOCK=NONE;
INSERT INTO schema_migrations(version)
VALUES ('20260717_add_listing_public_id');
