## Hint 1

Zapis to `function defineRoutes<const T extends ...>(routes: T)`.

## Hint 2

Zwróć `Readonly<T>`, a nie sam constraint `Record<string, ...>`.

## Hint 3

`tuple` potrzebuje `const T extends readonly unknown[]` i może zwrócić `values`.
