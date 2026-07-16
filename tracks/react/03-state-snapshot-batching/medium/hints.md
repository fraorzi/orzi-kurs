## Hint 1

Trzy wywołania `setCount(count + 1)` zapisują trzy razy wartość obliczoną z tego
samego snapshotu.

## Hint 2

Setter przyjmuje również funkcję, której argumentem jest najnowsza wartość z kolejki.

## Hint 3

Wywołaj trzy razy `setCount(current => current + 1)`.
