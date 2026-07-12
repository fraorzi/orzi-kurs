## Hint 1

Oba dekoratory zwracają nową funkcję zapisaną przez `function` (nie arrow!) —
wrapper musi mieć własne `this`, żeby móc je przekazać dalej przez
`fn.apply(this, args)`. Argumenty zbierz przez rest: `function wrapper(...args)`.

## Hint 2

`spy`: funkcja to obiekt — można jej dopisać właściwość. Zadeklaruj
`function wrapper(...args) { ... }`, po deklaracji przypisz `wrapper.calls = []`.
W środku: dopisz `args` do `wrapper.calls`, zwróć `fn.apply(this, args)`.

## Hint 3

`once`: dwie zmienne w zasięgu dekoratora — `called` (boolean) i `result`.
We wrapperze: jeśli `!called`, ustaw flagę i policz `result = fn.apply(this, args)`.
Zawsze zwracaj `result`. Flaga zamiast sprawdzania `result === undefined` —
fn może legalnie zwrócić `undefined`.
