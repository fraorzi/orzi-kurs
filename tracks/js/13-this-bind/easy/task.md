# Easy — kalkulator i drabina

Dwa zadania z javascript.info o metodach obiektów i `this`.

## 1. `createCalculator()`

Zwraca obiekt kalkulatora z metodami:

- `read(a, b)` — zapisuje dwie wartości na obiekcie (przez `this`),
- `sum()` — zwraca ich sumę,
- `mul()` — zwraca ich iloczyn.

```js
const calc = createCalculator();
calc.read(2, 3);
calc.sum(); // 5
calc.mul(); // 6
```

## 2. `createLadder()`

Zwraca obiekt drabiny: `{ step: 0 }` z metodami `up()`, `down()` i `getStep()`.
`up`/`down` zmieniają `step` o 1 i **zwracają `this`**, żeby działał chaining.

```js
const ladder = createLadder();
ladder.up().up().down().getStep(); // 1
ladder.up().getStep();             // 2
```
