# Hard [O] — łączenie kolekcji: `.find()` w pętli → indeks `Map`

`attachUsers(orders, users)` zwraca **nową** tablicę zamówień, każde wzbogacone o pole
`user` — obiekt użytkownika o `id` równym `order.userId` (albo `null`, gdy brak).

Kod jest **poprawny**, ale wolny: dla **każdego** zamówienia robi `users.find(...)`, które
skanuje całą listę użytkowników — O(zamówienia·użytkownicy). Gdy obie listy rosną, robi się
kwadratowo. Przepisz: zbuduj indeks `Map` (`id → user`) **raz** i odpytuj go w O(1).

```js
attachUsers(
  [{ id: 1, userId: 10 }, { id: 2, userId: 20 }],
  [{ id: 10, name: "Ala" }, { id: 20, name: "Ola" }],
);
// [ { id: 1, userId: 10, user: { id: 10, name: "Ala" } },
//   { id: 2, userId: 20, user: { id: 20, name: "Ola" } } ]

attachUsers([{ id: 1, userId: 99 }], []); // [{ id: 1, userId: 99, user: null }]
```

Kontrakt bez zmian — te same wyniki, tylko w czasie liniowym (O(n + m)). Nie mutuj wejścia.
