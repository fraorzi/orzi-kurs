## Hint 1

Trzymaj `const events = new Map()` w domknięciu fabryki. Klucz to nazwa zdarzenia, wartość
to **tablica** słuchaczy (tablica zachowuje kolejność zapisania).

## Hint 2

```js
export function createEmitter() {
  const events = new Map();
  return {
    on(event, handler) {
      if (!events.has(event)) events.set(event, []);
      events.get(event).push(handler);
    },
    emit(event, payload) {
      for (const handler of [...(events.get(event) ?? [])]) {
        handler(payload);
      }
    },
    off(event, handler) {
      const handlers = events.get(event);
      if (handlers) events.set(event, handlers.filter((h) => h !== handler));
    },
  };
}
```

`emit` iteruje po **kopii** (`[...]`) i po `?? []` — brak słuchaczy to pusta lista.
`off` filtruje po referencji funkcji.
