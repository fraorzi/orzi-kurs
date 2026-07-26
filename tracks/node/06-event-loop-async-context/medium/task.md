# Medium — ogranicz starvation mikrotasków

Masz budżet pracy wykonywanej mikrotaskami; po jego wyczerpaniu kolejne
zadania mają przejść przez `setImmediate`, żeby nie zagłodzić pętli.
Zaimplementuj `solve(count, budget)`:

- wykonaj `count` jednostek pracy; każda jednostka ma przejść przez osobny mikrotask
  i zwiększyć licznik;
- po każdych `budget` jednostkach — jeżeli zostało coś do zrobienia — oddaj sterowanie
  do kolejnej fazy event loopa przez promisowy wariant `setImmediate` i policz to jako yield;
- zwróć `{ completed, yields }`; `budget < 1` to `Error`.

```ts
await solve(10, 4); // { completed: 10, yields: 2 } — po 4 i po 8
await solve(4, 4);  // { completed: 4, yields: 0 } — nic po ostatniej partii
```
