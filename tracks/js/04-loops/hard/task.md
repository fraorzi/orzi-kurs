# Hard — sito Eratostenesa

Zaimplementuj w `starter.js` dwie funkcje.

## 1. `sieve(n)`

Tablica liczb pierwszych `≤ n` — ale tym razem **algorytmem sita Eratostenesa**
(ćwiczenie „Sieve" z Exercism): zamiast sprawdzać każdą liczbę osobno,
wykreślaj wielokrotności znalezionych liczb pierwszych.

Algorytm:

1. przygotuj tablicę flag dla liczb `2..n`,
2. idź od 2 w górę: jeśli liczba niewykreślona — jest pierwsza; wykreśl jej
   wielokrotności (możesz zacząć od `i*i`, mniejsze już wykreślił ktoś inny),
3. zbierz niewykreślone.

**Będzie benchmark**: podejście z dzieleniem (jak `primesUpTo` z poziomu medium)
robi się kwadratowe względem n i obleje test wydajności. Sito jest ~liniowe.

```js
sieve(10); // [2, 3, 5, 7]
sieve(2);  // [2]
sieve(1);  // []
```

## 2. `collatzLength(n)`

Długość ciągu Collatza zaczynającego się od `n` (Project Euler, problem 14):
parzysta → `n/2`, nieparzysta → `3n+1`, aż do 1. Długość liczy **oba końce**
(startowe `n` i końcowe `1`).

```js
collatzLength(6); // 9  — ciąg: 6, 3, 10, 5, 16, 8, 4, 2, 1
collatzLength(1); // 1
```
