SELECT id, value, value - LAG(value) OVER (ORDER BY measured_at) AS delta FROM readings ORDER BY id;
