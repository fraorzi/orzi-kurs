## Hint 1

`partial`: zwróć **zwykłą funkcję** (nie arrow — potrzebuje własnego this
z wywołania) robiącą `fn.call(this, ...preset, ...args)`.
`greetTwiceBroken`: problem to `callTwice(user.greet)` — do `callTwice` trafia
goła funkcja, wywoływana potem jako `fn()` bez obiektu.

## Hint 2

Dwie równoważne naprawy `greetTwiceBroken`:

```js
return callTwice(user.greet.bind(user)); // this przyspawane
return callTwice(() => user.greet());    // wywołanie nadal przez kropkę
```

`partial`:

```js
return function (...args) {
  return fn.call(this, ...preset, ...args);
};
```
