# Easy - zwróć idempotentny cleanup

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Moduł wystawia subskrypcję zdarzeń, a konsument dostaje funkcję sprzątającą.
Zaimplementuj `solve(emitter, event, listener)`:

- podepnij `listener` na `event` przez `emitter.on`;
- zwróć funkcję cleanup, która zdejmuje dokładnie ten listener;
- cleanup wywołany wielokrotnie ma być bezpieczny: drugi i kolejny raz nic nie
  robi (w szczególności nie zdejmuje innych listenerów tego samego zdarzenia).

```ts
const off = solve(bus, "job", onJob);
off();
off(); // bezpieczne, nic nie robi
```
