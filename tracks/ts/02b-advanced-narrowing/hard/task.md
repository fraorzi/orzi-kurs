# Hard — wyczerpujący reducer koszyka

Zaimplementuj reducer oparty na unii rozłącznej:

```ts
type CartAction =
  | { type: "itemAdded"; productId: string; quantity: number }
  | { type: "itemRemoved"; productId: string }
  | { type: "couponApplied"; code: string }
  | { type: "cleared" };
```

Stan przechowuje ilości w `Record<string, number>` i opcjonalny kod kuponu.

- dodanie sumuje ilość i odrzuca ilość mniejszą od 1 przez `RangeError`,
- usunięcie nieistniejącego produktu jest no-op,
- kupon jest zapisywany wielkimi literami,
- wyczyszczenie zwraca pusty stan,
- wejście nie może być mutowane.

Każdy wariant obsłuż jawnie. Końcowa gałąź ma wywoływać `assertNever(action)`, aby
dodanie nowej akcji powodowało błąd kompilacji.
