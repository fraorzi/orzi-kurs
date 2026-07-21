SELECT customer_id, SUM(total) AS paid_total FROM orders WHERE status = 'paid' AND SUM(total) >= 100 GROUP BY customer_id ORDER BY customer_id;
