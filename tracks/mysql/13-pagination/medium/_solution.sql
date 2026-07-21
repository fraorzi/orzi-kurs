SELECT id FROM posts WHERE (created_at, id) < ('2026-01-02 10:00:00', 5) ORDER BY created_at DESC, id DESC LIMIT 3;
