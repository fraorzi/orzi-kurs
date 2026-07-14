## Hint 1

Zacznij akumulator od `0n` (BigInt). Dla każdego elementu skonwertuj go na BigInt **przed**
dodaniem — `total + value` z mieszanymi typami rzuciłoby `TypeError`.

## Hint 2

`BigInt(value)` przyjmuje `bigint`, całkowity `number` i string z liczbą całkowitą. Problem
to niecałkowity `number` — złap go wcześniej i rzuć czytelny `TypeError`:

```js
export function sumMixed(values) {
  let total = 0n;
  for (const value of values) {
    if (typeof value === "number" && !Number.isInteger(value)) {
      throw new TypeError(`nie można skonwertować ${value} na BigInt — tylko całkowite`);
    }
    total += BigInt(value);
  }
  return total;
}
```

Pusta tablica naturalnie zwróci `0n`. String z ułamkiem (`"1.5"`) i tak rzuci błąd przy
`BigInt(...)` — ten guard łapie tylko przypadek `number`, gdzie komunikat może być czytelniejszy.
