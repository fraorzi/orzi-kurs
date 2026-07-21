ALTER TABLE customers
  ADD COLUMN given_name VARCHAR(80) NULL,
  ADD COLUMN family_name VARCHAR(80) NULL;

UPDATE customers
SET given_name = SUBSTRING_INDEX(name, ' ', 1),
    family_name = SUBSTRING(name, CHAR_LENGTH(SUBSTRING_INDEX(name, ' ', 1)) + 2);

ALTER TABLE customers
  MODIFY given_name VARCHAR(80) NOT NULL,
  MODIFY family_name VARCHAR(80) NOT NULL;
