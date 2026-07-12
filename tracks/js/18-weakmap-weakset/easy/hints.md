## Hint 1

`WeakSet` ma trzy metody: `add`, `has`, `delete`. Trzymaj jeden `WeakSet` w domknięciu
fabryki, a metody `markRead`/`isRead` niech go używają.

## Hint 2

```js
export function makeReadTracker() {
  const read = new WeakSet();
  return {
    markRead(message) {
      read.add(message);
    },
    isRead(message) {
      return read.has(message);
    },
  };
}
```

`read` żyje w domknięciu — każde wywołanie `makeReadTracker()` tworzy nowy, niezależny
WeakSet. `WeakSet.add` sam rzuci `TypeError` dla prymitywu, więc nie musisz tego
sprawdzać ręcznie.
