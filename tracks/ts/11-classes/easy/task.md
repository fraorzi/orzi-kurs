# Easy — klasa z polami, `readonly` i `private`

## `class Account`

Konto bankowe. Użyj **parameter properties** (modyfikatory przy parametrach konstruktora).

```ts
const acc = new Account("ACC-1", 100);

acc.id;                // "ACC-1"  — readonly, publiczne
acc.getBalance();      // 100
acc.deposit(50);       // 150      — zwraca nowe saldo
acc.withdraw(30);      // 120
acc.withdraw(1000);    // rzuca Error("brak środków")
acc.deposit(-1);       // rzuca RangeError("kwota musi być dodatnia")
acc.withdraw(0);       // rzuca RangeError("kwota musi być dodatnia")
```

Wymagania:

- `id: string` — `readonly`, publiczne (zapis `acc.id = "X"` ma być błędem typu),
- saldo — `private` (odczyt `acc.balance` z zewnątrz ma być błędem typu),
- `getBalance(): number`,
- `deposit(amount: number): number` i `withdraw(amount: number): number` zwracają saldo po
  operacji,
- kwota `<= 0` w obu metodach → `RangeError("kwota musi być dodatnia")`,
- wypłata ponad saldo → `Error("brak środków")` (saldo bez zmian).

## `describeAccount(account: Account): string`

```ts
describeAccount(new Account("ACC-1", 100)); // "ACC-1: 100.00 zł"
```
