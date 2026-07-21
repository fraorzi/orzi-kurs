ALTER TABLE users
  ADD COLUMN phone_e164 VARCHAR(16) NULL;

UPDATE users
SET phone_e164 = CONCAT('+48', REGEXP_REPLACE(phone, '[^0-9]', ''));

ALTER TABLE users
  MODIFY phone_e164 VARCHAR(16) NOT NULL,
  ADD CONSTRAINT uq_users_phone_e164 UNIQUE (phone_e164);
