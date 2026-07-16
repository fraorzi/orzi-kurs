## Hint 1

Parameter properties skracają konstruktor do zera linii ciała:

```ts
constructor(
  readonly id: string,
  private balance: number,
) {}
```

Modyfikator (`readonly`, `private`, `public`, `protected`) przy parametrze deklaruje pole
i przypisuje wartość automatycznie.

## Hint 2

`private balance` znaczy, że `acc.balance` z zewnątrz to błąd **kompilacji**. Dostęp do
salda dajesz przez `getBalance()` — i tylko przez niego korzysta z niego `describeAccount`.

## Hint 3

Walidacja kwoty powtarza się w `deposit` i `withdraw` — wyciągnij ją do prywatnej metody:

```ts
private assertPositive(amount: number): void {
  if (amount <= 0) throw new RangeError("kwota musi być dodatnia");
}
```

## Hint 4

Kolejność sprawdzeń w `withdraw` ma znaczenie: najpierw kwota (`RangeError`), potem
środki (`Error`). Rzucenie przed modyfikacją salda gwarantuje, że nieudana operacja nie
zostawi konta w połowicznym stanie.
