export function createBankAccount(initialBalance = 0) {
  let balance = initialBalance;

  const assertPositive = (amount) => {
    if (amount <= 0) {
      throw new RangeError("kwota musi być dodatnia");
    }
  };

  return {
    deposit(amount) {
      assertPositive(amount);
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      assertPositive(amount);
      if (amount > balance) {
        throw new RangeError("niewystarczające środki");
      }
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    },
  };
}
