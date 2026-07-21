SELECT
  w.BLOCKING_THREAD_ID AS waiting_thread_id,
  w.REQUESTING_THREAD_ID AS blocking_thread_id,
  b.OBJECT_SCHEMA AS object_schema,
  b.OBJECT_NAME AS object_name,
  b.LOCK_TYPE AS lock_type,
  b.LOCK_MODE AS lock_mode
FROM performance_schema.data_lock_waits w
JOIN performance_schema.data_locks b
  ON b.ENGINE_LOCK_ID = w.BLOCKING_ENGINE_LOCK_ID AND b.ENGINE = w.ENGINE
