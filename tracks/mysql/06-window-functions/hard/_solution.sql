SELECT id, SUM(amount) OVER (ORDER BY paid_at, id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total FROM payments ORDER BY paid_at, id;
