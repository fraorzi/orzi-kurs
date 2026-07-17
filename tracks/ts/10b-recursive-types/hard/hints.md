## Hint 1

Warunek to `Input extends readonly [infer Head, ...infer Tail]`.

## Hint 2

Wywołaj `Reverse<Tail, readonly [Head, ...Acc]>`.

## Hint 3

Runtime utwórz kopię przez spread i odwróć ją. TS nie potrafi udowodnić zależności
między `reverse()` a rekurencyjnym typem, więc na tej granicy potrzebne jest kontrolowane
`as unknown as Reverse<Input>`.
