SELECT id, value, value - LAG(value) OVER (PARTITION BY sensor_id ORDER BY measured_at, id) AS delta FROM readings ORDER BY id;
