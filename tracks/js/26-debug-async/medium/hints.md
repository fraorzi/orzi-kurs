## Hint 1

- `processAll`: `forEach` ignoruje zwracane obietnice — zamień na `for (const item of items)`
  z `await` w środku (albo `Promise.all(items.map(asyncFn))`).
- `mapAsync`: `items.map(asyncFn)` to tablica obietnic. Owiń ją w `Promise.all(...)`.

## Hint 2

```js
export async function processAll(items, asyncFn) {
  const results = [];
  for (const item of items) {
    results.push(await asyncFn(item)); // for..of czeka na każdy await
  }
  return results;
}

export async function mapAsync(items, asyncFn) {
  return Promise.all(items.map(asyncFn)); // zbierz tablicę obietnic w jedną
}
```
