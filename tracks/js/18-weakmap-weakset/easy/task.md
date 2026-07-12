# Easy — flaga „przeczytane" na WeakSet

Zaimplementuj w `starter.js` fabrykę `makeReadTracker()`, która śledzi, które wiadomości
(obiekty) zostały przeczytane — **bez** dodawania pól do samych wiadomości. Użyj `WeakSet`.
(Wariacja ćwiczenia „Store unread flags" z javascript.info.)

`makeReadTracker()` zwraca obiekt z dwiema metodami:

- `markRead(message)` — oznacza wiadomość jako przeczytaną,
- `isRead(message)` — `true`, jeśli wcześniej oznaczona; inaczej `false`.

```js
const tracker = makeReadTracker();
const msg = { text: "cześć" };

tracker.isRead(msg);   // false
tracker.markRead(msg);
tracker.isRead(msg);   // true

tracker.isRead({ text: "cześć" }); // false — inny obiekt, mimo tej samej treści
```

`WeakSet` przyjmuje tylko obiekty — próba `markRead("string")` rzuci `TypeError`,
i to jest oczekiwane.
