# Zrób addytywny upsert

Dodaj ilość do koszyka. Konflikt `(cart_id, product_id)` ma zwiększyć qty, nie nadpisać jej wartością wejściową.

Zapytanie musi działać przy domyślnym rygorystycznym sql_mode MySQL 8.4.
