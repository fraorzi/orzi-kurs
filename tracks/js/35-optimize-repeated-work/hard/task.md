# Hard [O] — firstUnique: podwójne skanowanie → jedno zliczenie

`firstUnique(arr)` zwraca **pierwszą** wartość występującą dokładnie raz, albo `undefined`,
gdy takiej nie ma.

Kod jest **poprawny**, ale kwadratowy: dla każdego elementu woła `indexOf` i `lastIndexOf`
(oba O(n)) — łącznie O(n²). Testy poprawności przechodzą — obleje benchmark. Przepisz na
czas liniowy: policz częstości **raz**, potem znajdź pierwszą wartość o liczności 1.

```js
firstUnique([1, 2, 2, 3, 3]); // 1
firstUnique([2, 2, 1, 3, 3]); // 1
firstUnique([1, 1, 2, 2]);    // undefined
```

Podpowiedź kierunkowa: zamiast pytać tablicę „ile razy występuje ta wartość" dla każdego
elementu, policz wszystkie liczności jednym przejściem.
