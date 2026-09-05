# Medium - konto bankowe z prywatnym saldem

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## `createBankAccount(initialBalance = 0)`

Zwraca obiekt konta z metodami `deposit(amount)`, `withdraw(amount)`
i `getBalance()`. Saldo ma być **prywatne** - trzymane w zmiennej zamkniętej
w zakresie funkcji, NIE jako właściwość zwracanego obiektu.

Zasady:

- `deposit(amount)` - dodaje do salda i zwraca nowe saldo,
- `withdraw(amount)` - odejmuje i zwraca nowe saldo; próba wypłaty ponad stan
  → `throw new RangeError(...)`,
- kwota `<= 0` w `deposit` i `withdraw` → `throw new RangeError(...)`,
- `getBalance()` - zwraca aktualne saldo,
- każde konto liczy niezależnie.

```js
const account = createBankAccount(100);
account.deposit(50);    // 150
account.withdraw(30);   // 120
account.getBalance();   // 120
account.balance;        // undefined - saldo NIE jest właściwością!

account.withdraw(9999); // RangeError
account.deposit(-5);    // RangeError
```
