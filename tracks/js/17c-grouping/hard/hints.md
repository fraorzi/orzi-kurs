## Hint 1

`users.find(...)` w środku `map` to skanowanie całej listy dla każdego zamówienia. Zbuduj
raz `Map` z `user.id` na `user`, potem odpytuj `byId.get(order.userId)` w O(1).

## Hint 2

```js
export function attachUsers(orders, users) {
  const byId = new Map(users.map((u) => [u.id, u]));
  return orders.map((order) => ({
    ...order,
    user: byId.get(order.userId) ?? null,
  }));
}
```

`new Map(users.map((u) => [u.id, u]))` buduje indeks w O(m); pętla po zamówieniach to O(n) × O(1).
