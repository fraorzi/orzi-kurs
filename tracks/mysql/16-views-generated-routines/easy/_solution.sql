CREATE SQL SECURITY INVOKER VIEW active_customer_contacts AS SELECT id, email FROM customers WHERE deleted_at IS NULL;
