## Hint 1

`PowerArray`: wystarczy `class PowerArray extends Array` z dwiema krótkimi
metodami — `filter`/`map` same zwrócą PowerArray, bo wewnętrznie tworzą wynik
przez `this.constructor`. `Wallet`: pole `#balance = 0;` deklarujesz w ciele
klasy; dostęp `this.#balance` działa tylko wewnątrz klasy.

## Hint 2

```js
export class Wallet {
  #balance;
  constructor(initial = 0) {
    this.#balance = initial;
  }
  get balance() {
    return this.#balance;
  }
  deposit(amount) {
    if (amount <= 0) throw new RangeError("kwota musi być dodatnia");
    this.#balance += amount;
    return this.#balance;
  }
  // withdraw analogicznie + kontrola stanu
}
```

Pole `#` nie jest właściwością obiektu — dlatego Object.keys/JSON go nie
widzą. To różnica względem konwencji `_name` z poziomu easy.
