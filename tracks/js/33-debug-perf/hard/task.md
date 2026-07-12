# Hard [D] — kwadratowa kolejka przez `shift()`

`processQueue(items, fn)` przetwarza elementy po kolei i zwraca tablicę wyników `fn(item)`.
Nie mutuje wejścia.

Kod jest **poprawny, ale kwadratowy**: zdejmuje elementy z **początku** tablicy przez
`shift()`, a `shift` przesuwa wszystkie pozostałe elementy (O(n)) — w pętli daje O(n²).
Testy poprawności przechodzą; obleje **benchmark skalowania**.

Przepisz na czas liniowy, zachowując kontrakt (kolejność wyników, brak mutacji `items`).

```js
processQueue([1, 2, 3], (x) => x * 2); // [2, 4, 6]
```

Podpowiedź kierunkowa: czy naprawdę musisz *usuwać* elementy z tablicy, żeby przejść po
niej po kolei?
