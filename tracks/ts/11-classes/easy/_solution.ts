export class Account {
  constructor(
    readonly id: string,
    private balance: number,
  ) {}

  getBalance(): number {
    return this.balance;
  }

  deposit(amount: number): number {
    this.assertPositive(amount);
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount: number): number {
    this.assertPositive(amount);
    if (amount > this.balance) throw new Error("brak środków");
    this.balance -= amount;
    return this.balance;
  }

  private assertPositive(amount: number): void {
    if (amount <= 0) throw new RangeError("kwota musi być dodatnia");
  }
}

export function describeAccount(account: Account): string {
  return `${account.id}: ${account.getBalance().toFixed(2)} zł`;
}
