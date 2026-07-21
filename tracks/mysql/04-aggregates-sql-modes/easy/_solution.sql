SELECT status, COUNT(*) AS order_count, SUM(total) AS total FROM orders GROUP BY status ORDER BY status;
