## Hint 1

Oba dekoratory zwracają nową funkcję, a stan (flaga „już wywołane" + wynik, albo cache)
trzymają w zmiennych domkniętych w zewnętrznej funkcji — dokładnie jak `count`
w liczniku z README.

## Hint 2

`once`: dwie zmienne w domknięciu — `called` (boolean) i `result`. W wrapperze:
jeśli `!called`, ustaw flagę i policz `result = fn(...args)`. Zawsze zwracaj `result`.

## Hint 3

`memoize`: `const cache = new Map()` w domknięciu. W wrapperze:
`if (!cache.has(arg)) cache.set(arg, fn(arg)); return cache.get(arg)`.
