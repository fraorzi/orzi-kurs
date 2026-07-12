# Medium — once, wiele argumentów i unsubscribe

Rozbuduj emitter. `createEmitter()` zwraca `{ on, once, emit, off }`:

- `on(event, handler)` — zapisuje słuchacza i **zwraca funkcję `unsubscribe`**, która go
  wypisuje (wygodniejsze niż pamiętanie `off`),
- `once(event, handler)` — słuchacz jednorazowy: po pierwszym `emit` sam się wypisuje,
- `emit(event, ...args)` — przekazuje **wszystkie** argumenty słuchaczom,
- `off(event, handler)` — jak wcześniej.

```js
const bus = createEmitter();
const calls = [];

const unsub = bus.on("sum", (a, b) => calls.push(a + b));
bus.emit("sum", 2, 3); // calls: [5]
unsub();
bus.emit("sum", 1, 1); // calls: [5] — wypisany przez unsubscribe

bus.once("ready", () => calls.push("ready"));
bus.emit("ready"); // calls: [5, "ready"]
bus.emit("ready"); // bez zmian — once wypalił się raz
```
