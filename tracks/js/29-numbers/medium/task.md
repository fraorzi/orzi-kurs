# Medium - porównanie floatów i toFixed jako liczba

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `approxEqual(a, b, tolerance = 1e-9)`

Zwróć `true`, gdy `a` i `b` są równe **z dokładnością** do `tolerance` - czyli
`|a - b| < tolerance`. To poprawny sposób porównywania liczb zmiennoprzecinkowych
(bezpośrednie `===` zawodzi przez błędy reprezentacji).

```js
approxEqual(0.1 + 0.2, 0.3); // true  (mimo że === daje false!)
approxEqual(1, 1.5);         // false
approxEqual(1, 1.0000000001, 1e-6); // true (w granicy tolerancji)
```

## 2. `toFixedNumber(value, digits)`

Zaokrąglij `value` do `digits` miejsc, ale zwróć **liczbę**, nie string (jak robi
`toFixed`). 

```js
toFixedNumber(3.14159, 2); // 3.14   (number)
toFixedNumber(5, 2);       // 5      (number, nie "5.00")
typeof toFixedNumber(1.239, 2); // "number"
```
