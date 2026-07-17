CREATE TRIGGER orders_status_audit AFTER UPDATE ON orders FOR EACH ROW
BEGIN
  INSERT INTO order_status_audit(order_id, old_status, new_status)
  VALUES (NEW.id, OLD.status, NEW.status);
END
