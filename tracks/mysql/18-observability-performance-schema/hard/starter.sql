SELECT DIGEST_TEXT AS digest, COUNT_STAR AS executions
FROM performance_schema.events_statements_summary_by_digest
WHERE SCHEMA_NAME = DATABASE()
ORDER BY COUNT_STAR DESC LIMIT 5
