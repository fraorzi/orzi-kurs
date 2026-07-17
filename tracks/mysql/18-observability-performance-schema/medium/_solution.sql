SELECT
  w.REQUESTING_THREAD_ID AS waiting_thread_id,
  w.BLOCKING_THREAD_ID AS blocking_thread_id,
  requested.OBJECT_SCHEMA AS object_schema,
  requested.OBJECT_NAME AS object_name,
  requested.LOCK_TYPE AS lock_type,
  requested.LOCK_MODE AS lock_mode
FROM performance_schema.data_lock_waits w
JOIN performance_schema.data_locks requested
  ON requested.ENGINE_LOCK_ID = w.REQUESTING_ENGINE_LOCK_ID
  AND requested.ENGINE = w.ENGINE
