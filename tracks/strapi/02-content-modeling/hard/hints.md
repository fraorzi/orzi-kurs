## Hint 1

`Block` to unia trzech literałów rozróżnianych przez `__component` — TypeScript
zawęża typ w każdej gałęzi `switch (block.__component)` automatycznie.

## Hint 2

Gałąź `default` z `return block satisfies never` nie kompiluje się, gdy
`switch` nie obsłużył wszystkich wariantów unii — to twój dowód
wyczerpującości, nie tylko notatka w komentarzu.

## Hint 3

`images.length`, nie `images.join(...)` — kontrakt liczy zdjęcia w galerii,
nie wypisuje ich treści.
