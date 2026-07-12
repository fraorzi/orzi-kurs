## Hint 1

`priceOf` to funkcja czysta — dla tego samego `productId` zawsze zwraca to samo. Owiń ją
w cache: przy pierwszym pytaniu o dany produkt policz i zapisz w `Map`, przy kolejnych
odczytaj z `Map`.

## Hint 2

```js
export function totalCost(orders, priceOf) {
  const cache = new Map();
  const getPrice = (id) => {
    if (!cache.has(id)) cache.set(id, priceOf(id));
    return cache.get(id);
  };
  let total = 0;
  for (const order of orders) {
    total += order.qty * getPrice(order.productId);
  }
  return total;
}
```

`getPrice` woła `priceOf` tylko przy pierwszym napotkaniu produktu — reszta idzie z cache.
