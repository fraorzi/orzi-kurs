# Hard - nieskończony generator i komunikacja dwukierunkowa

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwa generatory.

## 1. `fibonacci()`

**Nieskończony** generator ciągu Fibonacciego, zaczynając od `0, 1`:

```js
// pierwsze 8 wartości: 0, 1, 1, 2, 3, 5, 8, 13
const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
```

Nie materializuj tablicy - generator ma być leniwy i nieskończony.

## 2. `accumulator()`

Generator z komunikacją dwukierunkową: utrzymuje sumę bieżącą. **Pierwsze** `next()`
przygotowuje generator i zwraca `0` (jego argument jest ignorowany). Każde kolejne
`next(x)` dodaje `x` do sumy i zwraca nową sumę.

```js
const acc = accumulator();
acc.next().value;   // 0   (priming - argument pomijany)
acc.next(10).value; // 10
acc.next(5).value;  // 15
acc.next(3).value;  // 18
```

Klucz: `yield` jest wyrażeniem - wartość z `next(arg)` staje się wynikiem `yield`
przy wznowieniu.
