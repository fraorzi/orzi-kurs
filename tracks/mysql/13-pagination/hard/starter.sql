CREATE INDEX ix_posts_feed ON posts(created_at,id); SELECT id FROM posts WHERE (created_at,id) < ('2026-01-04 10:00:00',2) ORDER BY created_at DESC,id DESC LIMIT 3;
