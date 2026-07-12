## Hint 1

`makeReadLog` to bliźniak read-trackera z poziomu easy, ale na `WeakMap` (bo trzymasz
wartość — datę — a nie samą obecność): `dates.set(message, date)` i `dates.get(message)`.

## Hint 2

Prywatność przez WeakMap opiera się na tym, że mapa jest **poza** instancją — deklarujesz
ją raz na poziomie modułu, a kluczem jest `this`:

```js
const balances = new WeakMap();

export class Account {
  constructor(initial) {
    balances.set(this, initial);
  }
  deposit(amount) {
    balances.set(this, balances.get(this) + amount);
  }
  get balance() {
    return balances.get(this);
  }
}
```

Ponieważ saldo nie jest przypisane do `this.coś`, `Object.keys(acc)` jest puste,
a `JSON.stringify(acc)` daje `"{}"`.
