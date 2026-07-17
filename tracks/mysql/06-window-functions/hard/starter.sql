SELECT id, SUM(amount) OVER (ORDER BY paid_at) AS running_total FROM payments ORDER BY paid_at, id;
