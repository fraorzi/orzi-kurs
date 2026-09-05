# Easy - pierwsze elementy z iteratora

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Obie funkcje przyjmują dowolny **iterable** (tablica, `Set`, generator) i używają iterator
helpers. Do owinięcia iterable w iterator z metodami użyj `Iterator.from(iterable)`.

## 1. `firstN(iterable, n)`

Zwraca tablicę pierwszych `n` elementów.

```js
firstN([10, 20, 30, 40], 2); // [10, 20]
firstN(new Set([1, 2, 3]), 5); // [1, 2, 3]  (mniej niż n → tyle, ile jest)
```

## 2. `firstEvens(iterable, n)`

Zwraca tablicę pierwszych `n` liczb **parzystych** ze źródła.

```js
firstEvens([1, 2, 3, 4, 5, 6], 2); // [2, 4]
```

Skorzystaj z `.take(n)`, `.filter(...)` i `.toArray()`.
