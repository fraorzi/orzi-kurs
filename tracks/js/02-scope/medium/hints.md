## Hint 1

To wzorzec "prywatny stan przez zakres" z README: zadeklaruj `let balance`
wewnątrz `createBankAccount` i zwróć obiekt, którego metody czytają i zmieniają
tę zmienną. Z zewnątrz nie da się jej dotknąć — nie jest właściwością obiektu.

## Hint 2

```js
let balance = initialBalance;
return {
  deposit(amount) { /* walidacja, balance += amount, return balance */ },
  ...
};
```

Walidacja: najpierw `if (amount <= 0) throw new RangeError(...)`, w withdraw
dodatkowo `if (amount > balance) throw new RangeError(...)` — rzucaj PRZED
zmianą salda, żeby nieudana operacja niczego nie zepsuła.
