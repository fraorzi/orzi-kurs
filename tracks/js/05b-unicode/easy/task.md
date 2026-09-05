# Easy - jednostki UTF-16 vs punkty kodowe

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

`str.length` liczy jednostki UTF-16, a nie znaki Unicode - emoji spoza BMP zajmuje dwie
jednostki. Zaimplementuj dwie funkcje operujące na **punktach kodowych**.

## 1. `codePointCount(str)`

Zwraca liczbę punktów kodowych (pełnych znaków Unicode) w `str`.

```js
codePointCount("abc");   // 3
codePointCount("a😀b");  // 3  (mimo że "a😀b".length === 4)
codePointCount("");      // 0
```

## 2. `toCodePoints(str)`

Zwraca tablicę pełnych punktów kodowych jako stringi - pary zastępcze mają zostać w całości.

```js
toCodePoints("a😀");  // ["a", "😀"]
toCodePoints("xyz");  // ["x", "y", "z"]
```
