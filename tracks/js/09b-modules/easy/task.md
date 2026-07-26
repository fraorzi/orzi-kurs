# Easy — mały moduł zamówień

Uzupełnij trzy pliki w `src/`:

- `money.js`: eksport nazwany `formatMoney(amount, currency = "PLN")`, który formatuje
  kwotę przez `Intl.NumberFormat` dla polskiej lokalizacji i wskazanej waluty;
- `order.js`: importuje `formatMoney` i eksportuje
  `summarizeOrder({ id, total, currency })`, zwracając tekst
  `"Zamówienie <id>: <sformatowana kwota>"`;
- `index.js`: jawnie re-eksportuje `formatMoney` i `summarizeOrder`.

```js
summarizeOrder({ id: "A-17", total: 12.5, currency: "PLN" });
// "Zamówienie A-17: 12,50 zł"
```

Dokładny odstęp w formacie waluty zależy od `Intl`; test porównuje wynik z tym samym
formatterem, a nie z ręcznie wpisanym znakiem spacji.
