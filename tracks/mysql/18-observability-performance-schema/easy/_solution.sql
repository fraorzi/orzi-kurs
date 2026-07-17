SELECT
  DIGEST_TEXT AS digest,
  COUNT_STAR AS executions,
  ROUND(SUM_TIMER_WAIT / 1000000000000, 6) AS total_seconds,
  SUM_ROWS_EXAMINED AS rows_examined
FROM performance_schema.events_statements_summary_by_digest
WHERE SCHEMA_NAME = DATABASE()
  AND DIGEST_TEXT IS NOT NULL
ORDER BY SUM_TIMER_WAIT DESC
LIMIT 10
