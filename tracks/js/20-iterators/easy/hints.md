## Hint 1

`range` zwraca obiekt z jedną metodą pod kluczem-symbolem `[Symbol.iterator]`. Ta metoda
tworzy świeży licznik i zwraca iterator z metodą `next()`, która oddaje kolejne
`{ value, done }`.

## Hint 2

```js
export function range(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start; // stan lokalny iteratora — nowy przy każdej iteracji
      return {
        next() {
          return current <= end
            ? { value: current++, done: false }
            : { value: undefined, done: true };
        },
      };
    },
  };
}
```

`toArray` to pętla `for..of` (która sama używa protokołu iteratora):

```js
export function toArray(iterable) {
  const out = [];
  for (const item of iterable) out.push(item);
  return out;
}
```
