## Hint 1

`compact`: `filter` z funkcją sprawdzającą truthiness — najkrócej `Boolean`
jako callback. `typeOf`: jeden warunek na `null` przed zwykłym `typeof`.
`isNumericString`: trzy kroki — sprawdź typ, przytnij, skonwertuj i zweryfikuj.

## Hint 2

`isNumericString`: `typeof s !== "string"` → false; `s.trim() === ""` → false
(to jest obejście pułapki `Number("") === 0`); na końcu
`Number.isFinite(Number(s))` — odrzuci NaN i Infinity za jednym zamachem.
