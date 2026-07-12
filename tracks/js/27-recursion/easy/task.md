# Easy — factorial i pow (rekurencyjnie)

Zaimplementuj dwie klasyczne funkcje rekurencyjne (każda z przypadkiem bazowym i krokiem).

## 1. `factorial(n)`

Silnia: `n! = n * (n-1) * ... * 1`, przy czym `factorial(0) === 1`. Zakładamy `n >= 0`.

```js
factorial(0); // 1
factorial(1); // 1
factorial(5); // 120
```

## 2. `pow(base, exp)`

Potęga `base^exp` dla całkowitego `exp >= 0`, rekurencyjnie (bez `**` i `Math.pow`).
Baza: `pow(base, 0) === 1`.

```js
pow(2, 0);  // 1
pow(2, 10); // 1024
pow(5, 3);  // 125
```
