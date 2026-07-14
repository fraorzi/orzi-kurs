## Hint 1

Zacznij od `events.js` — `store.js` go potrzebuje. W `createEmitter` trzymaj
`const listeners = new Map()`. Klucz to nazwa zdarzenia, wartość to `Set` funkcji
(Set sam dba o brak duplikatów).

```js
on(event, handler) {
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event).add(handler);
  return () => this.off(event, handler); // unsubscribe
}
```

## Hint 2

`emit` musi zwrócić `boolean` i przetrwać wypisanie słuchacza w trakcie iteracji —
iteruj po kopii: `for (const h of [...set]) h(...args)`. Brak zbioru dla zdarzenia
oznacza brak słuchaczy → `return false`.

## Hint 3

W `store.js` stan i emitter żyją w domknięciu:

```js
let state = { ...initialState };
const emitter = createEmitter();
```

`set`/`update` nie mutują — budują nowy obiekt i emitują. Wydziel wspólny krok:

```js
function setState(next, key) {
  const prev = state;
  state = next;
  emitter.emit("change", state, prev, key);
}
```

## Hint 4

Strażnik „bez zmiany — bez zdarzenia": zanim wywołasz `setState`, porównaj
`state[key] === value` (dla `set`) lub `state[key] === updater(state[key])` (dla
`update`) i wtedy `return`. `subscribe` to zwykłe `return emitter.on("change", handler)`
— zwraca gotową funkcję odsubskrybowującą.
