## Hint 1

Starter podmienia `qty` na wartość przychodzącą (`incoming.qty`) zamiast
ją dodawać do istniejącej — dlatego drugie kliknięcie "dodaj do koszyka"
gubi wcześniejszą ilość zamiast ją powiększyć.

## Hint 2

Konflikt identyfikuje `PRIMARY KEY (cart_id, product_id)`. W klauzuli
`ON DUPLICATE KEY UPDATE` masz dostęp zarówno do `cart_items.qty`
(wartość już w tabeli), jak i do `incoming.qty` (wartość z `VALUES`) —
potrzebujesz obu naraz.

## Hint 3

Kształt: `... AS incoming ON DUPLICATE KEY UPDATE qty = cart_items.qty +
incoming.qty`. Test z dwukrotnym uruchomieniem sprawdza, czy suma rośnie
za każdym razem — jeśli po dwóch uruchomieniach `qty` wciąż równa się
wartości z pojedynczego żądania, wciąż nadpisujesz zamiast dodawać.
