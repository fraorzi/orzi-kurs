# Medium - transformacje bez mutowania

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` cztery funkcje. **Żadna nie może mutować tablicy wejściowej.**

## 1. `filterRange(arr, a, b)`

Nowa tablica z elementami z przedziału `[a, b]` (włącznie).

```js
filterRange([5, 3, 8, 1], 1, 4); // [3, 1]
```

## 2. `sortByAge(users)`

Nowa tablica użytkowników (`{ name, age }`) posortowana rosnąco po `age`.
Oryginalna kolejność w wejściu ma zostać nietknięta.

```js
sortByAge([{ name: "John", age: 25 }, { name: "Pete", age: 30 }, { name: "Mary", age: 28 }]);
// [John(25), Mary(28), Pete(30)]
```

## 3. `unique(arr)`

Nowa tablica bez duplikatów, kolejność pierwszych wystąpień zachowana.

```js
unique(["Hare", "Krishna", "Hare", "Krishna", ":-O"]); // ["Hare", "Krishna", ":-O"]
```

## 4. `groupById(users)`

Obiekt, w którym kluczem jest `user.id`, a wartością cały obiekt użytkownika.
Użyj `reduce`.

```js
groupById([{ id: "john", age: 20 }, { id: "ann", age: 24 }]);
// { john: { id: "john", age: 20 }, ann: { id: "ann", age: 24 } }
```
