## Hint 1

`makeArmy`: wszystkie shootery domykają **tę samą** zmienną `i`, która po pętli ma
wartość 10. Domknięcie trzyma referencję, nie kopię. Musisz sprawić, żeby każda iteracja
miała własną zmienną z bieżącą wartością.

## Hint 2

Dwa sposoby: `for (let j = 0; j < 10; j++)` — `let` w nagłówku `for` tworzy nową zmienną
na każdą iterację — albo wewnątrz `while` dodaj `const current = i` i zwracaj `current`.

## Hint 3

`spy`: zadeklaruj wrapper jako zwykłą funkcję (`function wrapper(...args) {...}`),
po deklaracji przypisz `wrapper.calls = []`. W środku: policz `result = fn.apply(this, args)`,
dopisz `{ args, result }` do `wrapper.calls`, zwróć `result`.
