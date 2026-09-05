# Easy [O] - memoizacja kosztownej ceny

Tryb: optymalizacja. Popraw istniejący kod w `starter.js`, zachowując wymagane wyniki. Kryterium wydajności podano poniżej.

`totalCost(orders, priceOf)` sumuje koszt zamówień: dla każdego zamówienia `{ productId, qty }`
mnoży ilość przez cenę produktu (`priceOf(productId)` - funkcja kosztowna).

Kod jest **poprawny**, ale woła `priceOf` dla **każdego** zamówienia - także wtedy, gdy
ten sam produkt powtarza się wielokrotnie. Bramka liczy wywołania `priceOf`: ma być
**jedno na różny produkt**, nie jedno na zamówienie. Dodaj memoizację, nie zmieniając
wyniku.

```js
const priceOf = (id) => (id === "a" ? 10 : 5);
totalCost(
  [
    { productId: "a", qty: 2 },
    { productId: "b", qty: 1 },
    { productId: "a", qty: 3 },
  ],
  priceOf,
); // 2*10 + 1*5 + 3*10 = 55; priceOf wołane 2 razy (a, b), nie 3
```
