SELECT customer_id, SUM(total) AS paid_total FROM orders WHERE status = 'paid' GROUP BY customer_id HAVING SUM(total) >= 100 ORDER BY customer_id;
