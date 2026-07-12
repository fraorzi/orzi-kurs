## Hint 1

- `makeGetters`: `i` jest zadeklarowane **raz**, przed pętlą `while`. Wszystkie strzałki
  `() => i` widzą tę samą zmienną, więc po pętli każda zwraca jej końcową wartość (`n`).
- `removeNegatives`: po `splice(i, 1)` element spod `i+1` wskakuje na `i`, ale `i++`
  przechodzi dalej — pominięty.

## Hint 2

- `makeGetters`: zamień `while` na `for (let i = 0; i < n; i++)`. `let` w nagłówku `for`
  tworzy **nowe** wiązanie `i` na każdą iterację, więc każda strzałka domyka własną kopię.
- `removeNegatives`: najprościej zwróć nową tablicę filtrem: `return arr.filter((x) => x >= 0)`
  (żadnej mutacji podczas iteracji). Alternatywy: pętla od końca albo `i--` po `splice`.
