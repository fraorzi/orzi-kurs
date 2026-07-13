## Hint 1

Utwórz jeden deferred na starcie: `const { promise, resolve, reject } = Promise.withResolvers()`.
`opened` to `promise`; `open` i `fail` po prostu wołają `resolve`/`reject`.

## Hint 2

```js
export function createGate() {
  const { promise, resolve, reject } = Promise.withResolvers();
  return { opened: promise, open: resolve, fail: reject };
}
```

Ta sama promisa jest współdzielona przez wszystkich czekających, więc jedno `open()`
budzi ich wszystkich.
