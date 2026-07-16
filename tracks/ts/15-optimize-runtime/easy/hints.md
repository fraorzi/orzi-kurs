## Hint 1

Problemem nie jest `map`, tylko `products.find(...)` wykonywane dla każdej pozycji.
Zamień listę produktów na indeks przed rozpoczęciem mapowania.

## Hint 2

`new Map(products.map((product) => [product.id, product]))` inferuje mapę z kluczem
`string` i wartością `Product`. Odczytuj ją przez `productsById.get(line.productId)`.

## Hint 3

`Map.get` zwraca `Product | undefined`, ale kontrakt wymaga `Product | null`. Użyj
`?? null` i pozostaw budowanie nowych obiektów pozycji, aby nie mutować wejścia.
