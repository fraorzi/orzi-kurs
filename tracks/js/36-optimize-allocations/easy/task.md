# Easy [O] — flatten: spread w reduce → jedno przejście

`flatten(arrays)` skleja tablicę tablic w jedną płaską tablicę (jeden poziom).

Kod jest **poprawny**, ale kwadratowy: `[...acc, ...arr]` w `reduce` kopiuje cały
akumulator przy każdym kroku (łącznie ~n²/2 kopiowań). Testy poprawności przechodzą —
obleje benchmark. Przepisz tak, by nie kopiować akumulatora w kółko.

```js
flatten([[1, 2], [3], [4, 5]]); // [1, 2, 3, 4, 5]
flatten([[], [1], []]);         // [1]
flatten([]);                    // []
```

Podpowiedź kierunkowa: czy musisz tworzyć nową tablicę w każdym kroku, skoro możesz
dokładać do jednego bufora?
