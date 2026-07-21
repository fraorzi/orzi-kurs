SELECT customer_id, SUM(total) AS revenue FROM orders GROUP BY customer_id HAVING SUM(total) > 70 ORDER BY customer_id;
