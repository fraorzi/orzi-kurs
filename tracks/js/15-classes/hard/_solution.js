export class PowerArray extends Array {
  isEmpty() {
    return this.length === 0;
  }

  first() {
    return this[0];
  }
}

export class Wallet {
  #balance;

  constructor(initial = 0) {
    this.#balance = initial;
  }

  get balance() {
    return this.#balance;
  }

  #assertPositive(amount) {
    if (amount <= 0) {
      throw new RangeError("kwota musi być dodatnia");
    }
  }

  deposit(amount) {
    this.#assertPositive(amount);
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    this.#assertPositive(amount);
    if (amount > this.#balance) {
      throw new RangeError("niewystarczające środki");
    }
    this.#balance -= amount;
    return this.#balance;
  }
}
