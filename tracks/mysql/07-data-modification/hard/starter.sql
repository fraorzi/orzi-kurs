INSERT INTO session_archive SELECT * FROM sessions WHERE expires_at < '2026-01-01'; DELETE FROM sessions;
