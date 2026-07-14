## Hint 1

Rozdziel „krok" od „uruchomienia". Kroki zwracają thunki tej drugiej funkcji:

```js
function evenStep(n) {
  return n === 0 ? true : () => oddStep(n - 1);
}
function oddStep(n) {
  return n === 0 ? false : () => evenStep(n - 1);
}
```

## Hint 2

Wspólna pętla trampoliny rozwija thunki i zwraca końcowy `boolean`:

```js
function run(step, n) {
  let result = step(n);
  while (typeof result === "function") {
    result = result();
  }
  return result;
}

export const isEven = (n) => run(evenStep, n);
export const isOdd = (n) => run(oddStep, n);
```

Bo krok zwraca `() => oddStep(...)` zamiast wołać `oddStep(...)`, na stosie jest zawsze jedna
ramka — `isEven(100000)` nie przepełni stosu.
