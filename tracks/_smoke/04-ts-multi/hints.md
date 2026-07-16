## Hint 1

`CartSummary` to obiekt z dwoma polami liczbowymi: `total` (łączna wartość)
i `items` (łączna liczba sztuk).

## Hint 2

`lineTotal` to zwykłe `line.price * line.qty`. W `summarize` przejdź po `lines`
(`reduce` albo `for…of`) i akumuluj oba pola naraz, zaczynając od
`{ total: 0, items: 0 }` — dzięki temu pusty koszyk działa bez dodatkowego `if`.
