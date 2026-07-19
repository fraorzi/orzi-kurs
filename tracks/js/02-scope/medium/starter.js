export function createBankAccount(initialBalance = 0) {
  let balance = initialBalance;

  function assertPositiveAmount(amount) {
    if (amount <= 0)
      throw new RangeError("Kwota mniejsza lub równa zero");
    return amount;
  }

  function deposit(amount) {
    assertPositiveAmount(amount);

    balance += amount;

    return balance;
  }

  function withdraw(amount) {
    assertPositiveAmount(amount);

    if (amount > balance)
      throw new RangeError(
        "Brak wystarczających środków na końcie",
      );

    balance -= amount;

    return balance;
  }

  return {
    deposit,
    withdraw,
    getBalance: () => balance,
  };
}
