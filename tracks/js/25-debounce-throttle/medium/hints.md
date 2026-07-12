## Hint 1

Trzymaj `let last = 0` (czas ostatniego przepuszczonego wywołania). W zwracanej funkcji
policz `now = Date.now()` i odpal `fn` tylko, gdy `now - last >= interval` — wtedy
zaktualizuj `last = now`.

## Hint 2

```js
export function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}
```

Start `last = 0` sprawia, że pierwsze wywołanie zawsze przechodzi (`now - 0` to ogromna
liczba ms od 1970). Kolejne w oknie mają `now - last < interval` i są pomijane.
