# Hard — zaimplementuj `==`

## `looseEq(a, b)`

Napisz własną implementację algorytmu luźnej równości (`IsLooselyEqual`
z ECMA-262, opisany też na MDN w „Equality comparisons and sameness") —
**bez używania `==`** (lint i tak go blokuje).

Reguły do zaimplementowania:

1. `null` i `undefined` są równe **sobie nawzajem** i niczemu innemu,
2. ten sam typ → porównaj przez `===`,
3. boolean → skonwertuj na number i porównuj dalej,
4. number ↔ string → string skonwertuj na number,
5. obiekt ↔ prymityw → obiekt skonwertuj na prymityw: najpierw `valueOf()`,
   a jeśli wynik nadal jest obiektem — `String(obj)`; potem porównuj dalej,
6. pozostałe kombinacje (np. symbol vs number) → `false`.

(Upraszczamy: pomijamy `BigInt` — prawdziwy algorytm `==` konwertuje też
bigint ↔ string/number, np. `1n == "1"` daje `true`. U nas reguła 6 zwraca `false`.)

```js
looseEq(null, undefined); // true  — reguła 1
looseEq(null, 0);         // false — null równa się TYLKO undefined
looseEq(0, "");           // true  — "" → 0
looseEq("1", true);       // true  — true → 1, "1" → 1
looseEq([1], "1");        // true  — [1] → "1"
looseEq(NaN, NaN);        // false — ten sam typ, a NaN !== NaN
looseEq({}, {});          // false — ten sam typ, różne referencje
```
