export class Account {
  // TODO: readonly id: string (publiczne) + private saldo — użyj parameter properties
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
    // TODO: kwota <= 0 → RangeError("kwota musi być dodatnia")
    return 0;
  }

  withdraw(amount: number): number {
    // TODO: brak środków → Error("brak środków"), saldo bez zmian
    return 0;
  }
}

export function describeAccount(account: Account): string {
  // TODO: "ACC-1: 100.00 zł"
  return "";
}
