# Medium — wczesne wyjścia i pętle zagnieżdżone

Zaimplementuj w `starter.js` trzy funkcje.

## 1. `primesUpTo(n)`

Tablica liczb pierwszych `≤ n` (zadanie „Output prime numbers" z javascript.info).
Podejście: dla każdego kandydata sprawdź podzielność w wewnętrznej pętli
z wczesnym wyjściem. Wydziel sprawdzanie do funkcji pomocniczej `isPrime` —
czytelniej niż etykiety.

```js
primesUpTo(10); // [2, 3, 5, 7]
primesUpTo(2);  // [2]
primesUpTo(1);  // []
```

## 2. `chessboard(size)`

String szachownicy `size × size` ze znaków `"#"` i `" "` (ćwiczenie „Chessboard"
z Eloquent JavaScript). Lewy górny róg to spacja, każdy wiersz zakończony `"\n"`.

```js
chessboard(2); // " #\n# \n"
chessboard(4); // " # #\n# # \n # #\n# # \n"
```

## 3. `firstIndexWhere(arr, pred)`

Indeks pierwszego elementu, dla którego `pred(element, index)` zwraca truthy,
albo `-1`. **Bez `findIndex`** — pętla z wczesnym wyjściem. Po znalezieniu
elementu `pred` nie może być wywoływany ani razu więcej.

```js
firstIndexWhere([5, 12, 8], (x) => x > 10);  // 1
firstIndexWhere([1, 2, 3], (x) => x > 100);  // -1
```
