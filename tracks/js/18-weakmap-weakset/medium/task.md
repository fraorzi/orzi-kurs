# Medium - dane poboczne (WeakMap) i prywatny stan klasy

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `makeReadLog()` - kiedy przeczytano

Fabryka logu dat odczytu wiadomości, oparta na `WeakMap` (klucz = wiadomość, wartość = data).
(Wariacja ćwiczenia „Store read dates" z javascript.info.) Zwraca:

- `markRead(message, date)` - zapisuje datę odczytu wiadomości,
- `readAt(message)` - zwraca zapisaną datę albo `undefined`, jeśli nieprzeczytana.

```js
const log = makeReadLog();
const msg = { text: "hej" };
log.readAt(msg);                       // undefined
log.markRead(msg, new Date(2020, 0, 1));
log.readAt(msg);                       // Date 2020-01-01
```

## 2. `class Account` - prywatne saldo przez WeakMap

Saldo ma być **prywatne**: niewidoczne w `Object.keys(account)` ani w `JSON.stringify`.
Trzymaj je w module-owym `WeakMap` kluczowanym `this`, nie w polu instancji.

- `new Account(initial)` - zakłada konto z saldem początkowym,
- `deposit(amount)` - dodaje do salda,
- getter `balance` - zwraca aktualne saldo.

```js
const acc = new Account(100);
acc.balance;              // 100
acc.deposit(50);
acc.balance;              // 150
Object.keys(acc);         // [] - saldo nie jest polem instancji
JSON.stringify(acc);      // "{}"
```
