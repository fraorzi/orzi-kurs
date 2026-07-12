# Easy — podstawy pisania funkcji

Zaimplementuj w `starter.js` trzy funkcje.

## 1. `min(a, b)`

Zwraca mniejszą z dwóch liczb. Dla równych argumentów zwraca tę wartość.

```js
min(2, 5);  // 2
min(3, -1); // -1
min(1, 1);  // 1
```

## 2. `pow(x, n)`

Zwraca `x` podniesione do potęgi `n`. `n` to liczba całkowita ≥ 1.
Policz **pętlą** — bez `Math.pow` i bez operatora `**`.

```js
pow(2, 3);  // 8
pow(3, 2);  // 9
pow(10, 1); // 10
```

## 3. `greet(name, greeting = "Cześć")`

Zwraca powitanie w formacie `"<greeting>, <name>!"`. Drugi parametr ma mieć
wartość domyślną `"Cześć"`. Użyj template literala.

```js
greet("Ala");        // "Cześć, Ala!"
greet("Ola", "Hej"); // "Hej, Ola!"
```
