# Medium - rest i funkcje jako wartości

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` trzy funkcje.

## 1. `sumAll(...nums)`

Przyjmuje dowolną liczbę argumentów (rest) i zwraca ich sumę. Bez argumentów zwraca `0`.

```js
sumAll(1, 2, 3); // 6
sumAll(5);       // 5
sumAll();        // 0
```

## 2. `applyEach(fns, x)`

Przyjmuje tablicę funkcji i wartość `x`. Zwraca **nową tablicę** wyników wywołania
każdej funkcji na `x`, w kolejności z tablicy wejściowej.

```js
const inc = (n) => n + 1;
const double = (n) => n * 2;
const square = (n) => n * n;

applyEach([inc, double, square], 3); // [4, 6, 9]
applyEach([], 1);                    // []
```

## 3. `compose2(f, g)`

Zwraca funkcję, która dla argumentu `x` liczy `f(g(x))` - **najpierw** `g`, potem `f`.

```js
const inc = (n) => n + 1;
const double = (n) => n * 2;

compose2(inc, double)(5); // 11 - double(5) = 10, potem inc(10) = 11
compose2(double, inc)(5); // 12 - inc(5) = 6, potem double(6) = 12
```
