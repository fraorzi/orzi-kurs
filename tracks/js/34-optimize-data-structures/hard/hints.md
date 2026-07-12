## Hint 1

Osobny `filter` dla każdej kategorii oznacza tyle przejść po transakcjach, ile jest
kategorii — O(kategorie·n). Jedno przejście wystarczy: dla każdej transakcji dopisz jej
kwotę do sumy jej kategorii.

## Hint 2

```js
export function groupSum(transactions) {
  const result = {};
  for (const t of transactions) {
    result[t.category] = (result[t.category] ?? 0) + t.amount;
  }
  return result;
}
```

Wzorzec „pobierz aktualną sumę albo 0, dodaj, zapisz" akumuluje wszystkie kategorie
w jednym przebiegu — O(n) niezależnie od liczby kategorii.
