# Easy [O] — countInBoth: includes → Set

`countInBoth(a, b)` zwraca liczbę **różnych** wartości występujących w obu tablicach.
Kod jest **poprawny**, ale kwadratowy: dla każdej wartości z `a` woła `b.includes(...)`
(O(m)), co daje O(n·m). Testy poprawności przechodzą — obleje benchmark skalowania.

Przepisz na czas liniowy, nie zmieniając kontraktu.

```js
countInBoth([1, 2, 3], [2, 3, 4]);       // 2  (2 i 3)
countInBoth([1, 1, 2], [2, 2]);          // 1  (liczymy RÓŻNE wartości)
countInBoth([1, 2], [3, 4]);             // 0
```

Podpowiedź kierunkowa: co pozwala sprawdzić przynależność do `b` w czasie stałym?
