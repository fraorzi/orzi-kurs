# Easy - `Promise.all` zachowujący tuple

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zdefiniuj `AwaitedTuple<Values>` i funkcję `resolveTuple(values)`.

```ts
resolveTuple([
  Promise.resolve(1),
  "ready",
  Promise.resolve({ ok: true })
]);
// Promise<[number, "ready", { ok: boolean }]>
```

Wynik ma zachować długość i typ każdej pozycji. Funkcja przyjmuje readonly tuple,
ale zwraca nową mutowalną tuple jak `Promise.all`.
