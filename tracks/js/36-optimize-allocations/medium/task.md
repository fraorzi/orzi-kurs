# Medium [O] — mergeAll: spread obiektu w reduce → jeden cel

`mergeAll(objects)` scala tablicę obiektów w jeden — późniejsze klucze nadpisują wcześniejsze.

Kod jest **poprawny**, ale kwadratowy: `{ ...acc, ...o }` w `reduce` kopiuje wszystkie
dotychczasowe klucze przy każdym kroku. Testy poprawności przechodzą — obleje benchmark.
Przepisz na scalanie do jednego obiektu.

```js
mergeAll([{ a: 1 }, { b: 2 }, { a: 9 }]); // { a: 9, b: 2 }  (a nadpisane)
mergeAll([]);                             // {}
```

Podpowiedź kierunkowa: istnieje wbudowana funkcja, która nakłada wiele obiektów na jeden
cel bez kopiowania go w kółko.
