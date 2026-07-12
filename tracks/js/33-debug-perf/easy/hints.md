## Hint 1

`users.find(...)` przechodzi tablicę od początku przy **każdym** `id` — to pętla w pętli,
czyli O(n·m). Zamiast szukać za każdym razem, przygotuj **raz** strukturę pozwalającą
odpytać po `id` w czasie stałym.

## Hint 2

`Map` daje `get` w O(1). Zbuduj indeks `id → name` jednym przejściem, potem tylko czytaj:

```js
export function namesByIds(users, ids) {
  const byId = new Map(users.map((user) => [user.id, user.name]));
  return ids.map((id) => byId.get(id));
}
```

Budowa indeksu to O(n), odczyty to O(m) — razem liniowo.
