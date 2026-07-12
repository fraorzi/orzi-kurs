# Medium [D] — stale closure i mutacja podczas iteracji

Dwie kompletne funkcje z **subtelnymi** błędami. Działają „na oko", ale dają złe wyniki.
Znajdź przyczynę i napraw.

## 1. `makeGetters(n)`

Ma zwrócić tablicę `n` funkcji, gdzie `getters[k]()` zwraca `k`.

```js
const g = makeGetters(3);
g[0](); // 0
g[1](); // 1
g[2](); // 2
```

Obecnie wszystkie funkcje zwracają tę samą liczbę. Zastanów się, którą zmienną domykają
i ile jest jej egzemplarzy.

## 2. `removeNegatives(arr)`

Ma zwrócić tablicę bez liczb ujemnych.

```js
removeNegatives([1, -2, -3, 4]); // [1, 4]
removeNegatives([-1, -2, -3]);   // []
```

Obecnie część ujemnych „przeżywa". Przyjrzyj się, co dzieje się z indeksami, gdy usuwasz
element w trakcie pętli rosnącej.
