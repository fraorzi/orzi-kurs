## Hint 1

`Promise.withResolvers()` zwraca gotowy obiekt `{ promise, resolve, reject }` — dokładnie
to, co masz oddać.

## Hint 2

```js
export function createDeferred() {
  return Promise.withResolvers();
}
```

(Jeśli chcesz zrobić to „ręcznie": `let resolve, reject; const promise = new Promise((res, rej) => { resolve = res; reject = rej; }); return { promise, resolve, reject };`.)
