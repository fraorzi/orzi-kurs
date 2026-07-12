# Easy — iterowalny range i konsumpcja iterables

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `range(start, end)`

Zwróć **iterowalny obiekt**, który przy iteracji wydaje liczby od `start` do `end`
włącznie. Musi działać ze spreadem, `for..of` i `Array.from`. (Przykład „range" z
javascript.info.)

```js
[...range(1, 4)];          // [1, 2, 3, 4]
Array.from(range(5, 5));   // [5]
[...range(3, 1)];          // [] — gdy start > end
```

Iteracja ma być **powtarzalna**: dwa niezależne przejścia po tym samym `range` dają
ten sam wynik (stan trzymaj w iteratorze, nie w obiekcie).

## 2. `toArray(iterable)`

Zbierz wszystkie elementy dowolnego iterable do tablicy, używając `for..of`. Ma działać
na tablicy, `Set`, stringu i na Twoim `range`.

```js
toArray(new Set([1, 2, 3])); // [1, 2, 3]
toArray("abc");              // ["a", "b", "c"]
toArray(range(1, 3));        // [1, 2, 3]
```
