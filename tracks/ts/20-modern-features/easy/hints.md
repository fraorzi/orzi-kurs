## Hint 1

Standardowy dekorator dostaje oryginalną metodę i `ClassMethodDecoratorContext`.
Nazwę zamień na string przez `String(context.name)`.

## Hint 2

Zwróć zwykłą funkcję z jawnym `this: This` oraz `...args: Args`. Oryginał wywołaj
przez `original.call(this, ...args)`.

## Hint 3

Pierwszy log wykonaj przed `try`, a drugi w `finally`. Dzięki temu `exit` pojawi się
zarówno przy zwrocie wyniku, jak i przy wyjątku.
