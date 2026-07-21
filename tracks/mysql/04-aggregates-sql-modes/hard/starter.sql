SELECT device_id, MAX(recorded_at) AS recorded_at, value FROM readings GROUP BY device_id ORDER BY device_id;
