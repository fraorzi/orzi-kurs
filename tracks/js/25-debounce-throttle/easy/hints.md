## Hint 1

Trzymaj `let timer` w domknięciu. W zwracanej funkcji: najpierw `clearTimeout(timer)`
(anuluj poprzednie odroczenie), potem `timer = setTimeout(() => fn(...), delay)`.

## Hint 2

```js
export function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

Użyj **zwykłej** funkcji (nie strzałki), żeby zachować `this`, i `fn.apply(this, args)`,
by przekazać kontekst i argumenty. Bez `clearTimeout` fn odpaliłby się dla każdego
wywołania z osobna.
