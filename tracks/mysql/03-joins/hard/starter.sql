SELECT e.email, m.email AS manager_email FROM employees e INNER JOIN employees m ON m.id = e.manager_id ORDER BY e.id;
