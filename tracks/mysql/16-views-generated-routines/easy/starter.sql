CREATE VIEW active_customer_contacts AS SELECT * FROM customers WHERE deleted_at IS NULL;
