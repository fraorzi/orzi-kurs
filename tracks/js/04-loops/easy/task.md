# Easy — klasyka pętli

Zaimplementuj w `starter.js` trzy funkcje.

## 1. `fizzBuzz(n)`

Zwraca tablicę dla liczb `1..n`: wielokrotności 3 zastąpione `"Fizz"`,
wielokrotności 5 — `"Buzz"`, wielokrotności obu — `"FizzBuzz"`, pozostałe
liczby bez zmian (jako number).

```js
fizzBuzz(5);  // [1, 2, "Fizz", 4, "Buzz"]
fizzBuzz(15); // [..., 14, "FizzBuzz"]
```

## 2. `sumRange(a, b)`

Suma liczb całkowitych od `a` do `b` **włącznie**. Gdy `a > b` — zwróć `0`.

```js
sumRange(1, 5);  // 15
sumRange(3, 3);  // 3
sumRange(5, 1);  // 0
```

## 3. `countVowels(str)`

Liczba samogłosek `a, e, i, o, u` w stringu, niezależnie od wielkości liter.
Użyj `for..of`.

```js
countVowels("JavaScript"); // 3
countVowels("XYZ");        // 0
```
