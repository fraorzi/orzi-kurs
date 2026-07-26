# Easy — arytmetyka BigInt

## 1. `bigFactorial(n)`

Zwraca `n!` jako **BigInt** (dla `n = 0` → `1n`). Ma być **dokładne** także dla dużych `n`,
gdzie `number` już traci precyzję.

```js
bigFactorial(5);  // 120n
bigFactorial(0);  // 1n
bigFactorial(25); // 15511210043330985984000000n
```

## 2. `bigPow(base, exp)`

Zwraca `base` do potęgi `exp` jako **BigInt**. `base` i `exp` przychodzą jako zwykłe liczby
(całkowite, `exp >= 0`).

```js
bigPow(2, 10); // 1024n
bigPow(2, 64); // 18446744073709551616n
```

W całej arytmetyce zachowaj jeden typ liczbowy — JavaScript nie pozwala mieszać `bigint`
z `number` w jednym działaniu.
