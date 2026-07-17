SELECT id, settings->>'$.notifications.language' AS language FROM profiles WHERE JSON_TYPE(settings->'$.notifications.language') = 'STRING' ORDER BY id;
