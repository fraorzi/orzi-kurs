## Hint 1

- `naturals`: jak `range`, ale `next()` **nigdy** nie zwraca `done: true` — zawsze
  `{ value: n, done: false }` z rosnącym `n`.
- `take`: nie używaj `for..of` (skonsumowałby nieskończony iterable, gdyby nie było
  warunku). Pobierz iterator ręcznie i wołaj `next()` w pętli `while`.

## Hint 2

```js
export function take(iterable, n) {
  const iterator = iterable[Symbol.iterator]();
  const out = [];
  while (out.length < n) {
    const { value, done } = iterator.next();
    if (done) break; // iterable skończył się wcześniej niż n
    out.push(value);
  }
  return out;
}
```

Warunek `out.length < n` sam obsługuje `n = 0` (pętla nie wykona się ani razu).
