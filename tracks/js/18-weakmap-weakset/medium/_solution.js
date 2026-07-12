export function makeReadLog() {
  const dates = new WeakMap();
  return {
    markRead(message, date) {
      dates.set(message, date);
    },
    readAt(message) {
      return dates.get(message);
    },
  };
}

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
