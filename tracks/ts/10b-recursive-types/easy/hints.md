## Hint 1

Najpierw obsłuż funkcję, potem tablicę, potem `object`, na końcu prymityw.

## Hint 2

Obiekt mapuj przez `{ readonly [K in keyof T]: DeepReadonly<T[K]> }`.

## Hint 3

Runtime przejdź po `Object.values(value)`, zamroź dzieci, a potem samą wartość.
