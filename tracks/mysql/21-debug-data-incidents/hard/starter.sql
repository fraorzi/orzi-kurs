ALTER TABLE users ADD COLUMN email_normalized VARCHAR(255) GENERATED ALWAYS AS (LOWER(TRIM(email))) STORED, ADD UNIQUE INDEX uq_users_email_normalized(email_normalized);
