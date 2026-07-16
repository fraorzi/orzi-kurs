## Hint 1

`typeof value === "number"` zawęża unię do `number` — dopiero wtedy wolno wywołać
`toFixed`. Kolejność sprawdzeń jest dowolna, ale po wykluczeniu `string` i `number`
zostaje już tylko `boolean`.

## Hint 2

`charCount`: `typeof []` to `"object"`, więc `typeof` tablicy nie rozpozna. Kanoniczny
strażnik to `Array.isArray(value)` — po nim kompilator wie, że masz `string[]` i wolno
wywołać `reduce`.

## Hint 3

`orDefault`: `value || fallback` zgubiłoby pusty string (jest falsy). Operator `??`
(nullish coalescing) reaguje **wyłącznie** na `null` i `undefined` — dokładnie o to chodzi.
