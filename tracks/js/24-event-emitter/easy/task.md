# Easy - on / emit / off

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj fabrykę `createEmitter()`, która zwraca obiekt z metodami `on`, `emit`, `off`.

- `on(event, handler)` - zapisuje słuchacza zdarzenia,
- `emit(event, payload)` - woła wszystkich słuchaczy `event` z `payload`, w kolejności
  zapisania,
- `off(event, handler)` - wypisuje danego słuchacza.

```js
const bus = createEmitter();
const received = [];
const handler = (msg) => received.push(msg);

bus.on("message", handler);
bus.emit("message", "a"); // received: ["a"]
bus.off("message", handler);
bus.emit("message", "b"); // received: ["a"] - handler wypisany

bus.emit("nieznane", 1);  // nic się nie dzieje (brak słuchaczy)
```

Wiele słuchaczy tego samego zdarzenia ma być wywołanych w kolejności `on`.
