# Hard - dokładne sumowanie kwot (BigInt + serializacja)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Kwoty pieniężne trzyma się w najmniejszej jednostce (grosze/centy) jako **liczby całkowite** -
`number` gubiłby grosze przy dużych sumach (błąd floata powyżej 2⁵³). Zaimplementuj
`sumAmounts(amounts)`:

- `amounts` - tablica stringów, każdy to (opcjonalnie ujemna) liczba całkowita groszy,
  np. `"1050"`, `"-30"`.
- Zwróć **dokładną** sumę jako **string dziesiętny** (nie BigInt - BigInt nie serializuje się
  przez `JSON.stringify`, więc kwoty przekazuje się jako string).
- Pusta tablica → `"0"`.

```js
sumAmounts(["1050", "200", "-50"]);              // "1200"
sumAmounts(["9007199254740993", "1"]);           // "9007199254740994"  (przez number wyszłoby błędne 9007199254740992)
sumAmounts([]);                                  // "0"
```

Nie konwertuj kwot przez `Number` - taka konwersja zgubiłaby precyzję, przed którą chroni
to zadanie.
