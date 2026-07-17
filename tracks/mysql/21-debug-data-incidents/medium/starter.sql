SET @current_value = (SELECT value FROM counters WHERE id = 1);
DO SLEEP(0.12);
UPDATE counters SET value = @current_value + 1 WHERE id = 1;
