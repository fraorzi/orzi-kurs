## Hint 1

Dwa niezależne filtry, nie jeden: `private === true` to jeden mechanizm,
`type === "password"` to drugi. Pole musi przejść oba, żeby trafić do
kontraktu.

## Hint 2

`attribute.private` bywa `undefined` — porównuj przez `!attribute.private`
albo `attribute.private !== true`, nie przez `"private" in attribute`.

## Hint 3

Filtrowanie i sortowanie to dwa oddzielne kroki na `Object.entries`; sortuj
na samym końcu, po wyfiltrowaniu nazw, żeby kolejność deklaracji w ogóle nie
miała znaczenia.
