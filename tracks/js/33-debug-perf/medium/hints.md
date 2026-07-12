## Hint 1

`subscribe` robi pętlę po `events` i woła `on` dla każdego. `unsubscribe` woła `off`
tylko dla `events[0]`. Symetria jest złamana — słuchacze pozostałych zdarzeń zostają
na zawsze.

## Hint 2

`unsubscribe` ma odwrócić tę samą pętlę:

```js
return () => {
  for (const event of events) {
    emitter.off(event, handler);
  }
};
```

Zasada: **każde `on` musi mieć swoje `off`**. Zapomniany słuchacz trzyma przy życiu
domknięcie (i wszystko, co ono domyka) — to klasyczny wyciek pamięci.
