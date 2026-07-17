CREATE INDEX ix_posts_feed ON posts(tenant_id, created_at, id);

SELECT id
FROM posts
WHERE tenant_id = 1
  AND (created_at, id) < ('2026-01-04 10:00:00', 2)
ORDER BY created_at DESC, id DESC
LIMIT 3;
