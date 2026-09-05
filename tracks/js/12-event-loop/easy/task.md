# Easy - zaplanuj kolejność

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## `scheduleLogs(log)`

Funkcja dostaje `log` i ma wywołać:

- `log("sync")` - synchronicznie, w trakcie wywołania `scheduleLogs`,
- `log("micro")` - z **mikrotaska**,
- `log("macro")` - z **makrotaska**.

Testy sprawdzają stan po każdej fazie event loopa osobno:

```js
const order = [];
scheduleLogs((label) => order.push(label));
// w tym momencie: ["sync"]           - nic asynchronicznego jeszcze nie ruszyło
// po mikrotaskach: ["sync", "micro"] - mikrotaski przed makrotaskami
// po makrotaskach: ["sync", "micro", "macro"]
```

Kolejność wywołań w kodzie jest dowolna - liczy się kolejność WYKONANIA wynikająca z faz
event loopa.
