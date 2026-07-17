## Hint 1

Sygnatura z osobnymi `Args extends readonly unknown[]` i `Result` zachowa kontrakt
bez `any`.

## Hint 2

Zwróć funkcję `async (...args: Args): Promise<Result> => { ... }`.

## Hint 3

W `catch` rzuć błąd, gdy próba osiągnęła limit albo `shouldRetry?.(...) === false`.
Brak predicate oznacza zgodę na retry.
