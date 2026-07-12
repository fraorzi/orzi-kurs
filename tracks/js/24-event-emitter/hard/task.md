# Hard — klasa EventEmitter w stylu Node

Zaimplementuj `class EventEmitter` z API zbliżonym do Node:

- `on(event, handler)` — dodaje słuchacza, **zwraca `this`** (łańcuchowanie),
- `once(event, handler)` — słuchacz jednorazowy, zwraca `this`,
- `off(event, handler)` — usuwa słuchacza po referencji (działa też dla `once`), zwraca `this`,
- `emit(event, ...args)` — woła słuchaczy w kolejności zapisania, zwraca `boolean`
  (czy byli jacyś słuchacze),
- `listenerCount(event)` — liczba słuchaczy zdarzenia,
- `removeAllListeners(event?)` — usuwa słuchaczy zdarzenia; bez argumentu — wszystkich,
  zwraca `this`.

```js
const ee = new EventEmitter();
const log = [];

ee.on("x", (n) => log.push(n)).on("x", (n) => log.push(n * 2)); // łańcuch
ee.emit("x", 5);        // log: [5, 10]; zwraca true
ee.emit("brak");        // zwraca false — brak słuchaczy

ee.once("y", () => log.push("once"));
ee.emit("y");           // log: [..., "once"]
ee.listenerCount("y");  // 0 — once się wypisał

ee.removeAllListeners("x");
ee.listenerCount("x");  // 0
```
