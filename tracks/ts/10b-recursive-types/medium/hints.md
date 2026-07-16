## Hint 1

W `Paths<T>` mapuj po `Extract<keyof T, string>`.

## Hint 2

Dla pola obiektowego zwróć `K | `${K}.${Paths<T[K]>}``; tablicę zatrzymaj na `K`.

## Hint 3

`PathValue` dzieli string wzorcem `` `${infer Head}.${infer Tail}` `` i odwołuje się
do `T[Head]`.
