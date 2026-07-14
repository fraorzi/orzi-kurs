## Hint 1

Sumuj na BigInt, konwertując każdy string osobno. Na końcu zamień wynik na string:

```js
export function sumAmounts(amounts) {
  let total = 0n;
  for (const amount of amounts) {
    total += BigInt(amount);
  }
  return total.toString();
}
```

## Hint 2

Dwie rzeczy, które łatwo zepsuć:

- **Nie** rób `Number(amount)` ani `total + Number(amount)` — to gubi precyzję powyżej
  `MAX_SAFE_INTEGER` (a i tak zmieszałoby typy). Konwertuj przez `BigInt(...)`.
- Zwracaj `total.toString()`, nie samą BigInt — bo `JSON.stringify(total)` rzuciłby
  `TypeError`, więc kwoty w API/JSON przekazuje się jako string.

Pusta tablica: pętla się nie wykona, `total` zostaje `0n`, `toString()` da `"0"`.
