SELECT id, name, 0 AS depth FROM categories WHERE parent_id = 1 ORDER BY id;
