# Easy - `settle`: obietnica, która nigdy nie odrzuca

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `settle(promise)` - funkcję async, która **nigdy się nie odrzuca**. Zamiast
tego zwraca obiekt opisujący wynik:

- sukces → `{ ok: true, value }`,
- odrzucenie → `{ ok: false, error }`.

```js
await settle(Promise.resolve(1));                 // { ok: true, value: 1 }
await settle(Promise.reject(new Error("boom")));  // { ok: false, error: Error("boom") }
await settle(42);                                 // { ok: true, value: 42 }  (await działa na nie-promisach)
```

Użyj `try/catch` **wokół `await`** - bez `await` odrzucenie by nie zostało złapane.
Ten wzorzec (zwrócenie wyniku zamiast rzucania) upraszcza obsługę wielu niezależnych operacji.
