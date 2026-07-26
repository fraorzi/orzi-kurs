export class Account {
  // TODO
  id: string;
  balance: number;

  constructor(id: string, initial: number) {
    this.id = id;
    this.balance = initial;
  }

  getBalance(): number {
    // TODO
    return 0;
  }

  deposit(amount: number): number {
    // TODO
    return 0;
  }

  withdraw(amount: number): number {
    // TODO
    return 0;
  }
}

export function describeAccount(account: Account): string {
  // TODO
  return "";
}
