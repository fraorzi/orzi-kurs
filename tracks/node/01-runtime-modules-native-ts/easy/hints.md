## Hint 1

Wyodrębnij rozszerzenie od ostatniej kropki (`file.slice(file.lastIndexOf("."))`)
— nazwa pliku może zawierać wiele kropek.

## Hint 2

Najpierw rozstrzygnij cztery jednoznaczne rozszerzenia (`.mjs`, `.mts`, `.cjs`,
`.cts`); tylko reszta patrzy na `packageType`.

## Hint 3

Zwróć uwagę, że mapowanie `packageType` → wynik to pojedynczy ternary:
`packageType === "module" ? "esm" : "cjs"`.
