## Hint 1

`Object.groupBy(iterowalne, funkcjaKlucza)` robi całą robotę — funkcja klucza dostaje
element i zwraca klucz grupy.

## Hint 2

```js
export function groupByFirstLetter(words) {
  return Object.groupBy(words, (w) => w[0]);
}
```
