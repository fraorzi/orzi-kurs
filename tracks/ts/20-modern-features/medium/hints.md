## Hint 1

`using` ma składnię podobną do `const`: `using resource = acquire();`.

## Hint 2

Nie musisz dodawać żadnego jawnego cleanup. TypeScript wygeneruje kod, który wywoła
`resource[Symbol.dispose]()` przy wyjściu ze scope.

## Hint 3

Pozostaw `return work(resource)` bez zmian. Semantyka `using` obejmuje również
wcześniejszy `return` i wyjątek.
