# Medium — delegacja przez yield*

`yield*` przekazuje iterację do innego iterable/generatora — wydaje wszystkie jego wartości
po kolei. Zaimplementuj w `starter.js`:

## 1. `flatten(arr)`

Generator spłaszczający **dowolnie zagnieżdżone** tablice na płaską sekwencję wartości.
Użyj rekurencji z `yield*`.

```js
[...flatten([1, [2, [3, [4]]]])]; // [1, 2, 3, 4]
[...flatten([[1], [], [2, 3]])];  // [1, 2, 3]
[...flatten([1, 2, 3])];          // [1, 2, 3]
```

## 2. `chain(...iterables)`

Generator łączący kilka iterables w jedną sekwencję (konkatenacja), po kolei. Działa
na tablicach, stringach, `Set` — na czymkolwiek iterowalnym.

```js
[...chain([1, 2], [3], [4, 5])];    // [1, 2, 3, 4, 5]
[...chain("ab", new Set([1, 2]))];  // ["a", "b", 1, 2]
[...chain()];                       // []
```
