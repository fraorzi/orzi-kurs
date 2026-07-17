INSERT INTO cart_items (cart_id, product_id, qty) VALUES (1,10,3) AS incoming ON DUPLICATE KEY UPDATE qty = cart_items.qty + incoming.qty;
