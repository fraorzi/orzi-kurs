## Hint 1

Przechowuj słuchaczy jako obiekty `{ fn, once }` — flaga `once` pozwoli `emit` wypisać
jednorazowego słuchacza po wywołaniu. `on` po dodaniu zwraca domknięcie usuwające tego
słuchacza. `emit(event, ...args)` przekazuje rozpakowane argumenty przez `l.fn(...args)`.

## Hint 2

```js
emit(event, ...args) {
  for (const l of [...(events.get(event) ?? [])]) { // iteruj po KOPII
    l.fn(...args);
    if (l.once) remove(event, l.fn); // wypisz jednorazowego po wywołaniu
  }
}
```

`on` zwraca unsubscribe:

```js
on(event, handler) {
  add(event, handler, false);
  return () => remove(event, handler);
}
```

`remove` filtruje po `l.fn`, więc `off(event, handler)` działa tak samo dla `on` i `once`.
