## Hint 1

Pole opcjonalne to `tags?: string[]`. Przy `strict` jego typ to `string[] | undefined`,
więc przed `join` musisz sprawdzić, czy w ogóle jest.

## Hint 2

`interface DiscountedProduct extends Product { discount: number }` — rozszerzenie dziedziczy
wszystkie pola i pozwala przypisać `DiscountedProduct` tam, gdzie oczekiwany jest `Product`.

## Hint 3

W `label` obsłuż oba przypadki jednym warunkiem: brak pola (`undefined`) i pusta tablica
znaczą to samo dla wyniku:

```ts
if (!product.tags || product.tags.length === 0) return base;
```

## Hint 4

`finalPrice`: `price * (1 - discount)` daje liczbę z błędem zmiennoprzecinkowym
(`71.99100000000001`). `Math.round(x * 100) / 100` przycina ją do dwóch miejsc i zwraca
liczbę (a nie string, jak `toFixed`).
