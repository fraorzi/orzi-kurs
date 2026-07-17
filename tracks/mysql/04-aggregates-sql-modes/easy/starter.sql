SELECT status, COUNT(*) AS order_count, total AS total FROM orders GROUP BY status ORDER BY status;
