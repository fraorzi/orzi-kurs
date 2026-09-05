# Easy - napraw var i shadowing

Tryb: naprawa. W `starter.js` jest celowo niepoprawny kod. Znajdź przyczynę błędu i doprowadź go do zachowania opisanego poniżej.

`starter.js` zawiera **kompletny, ale zepsuty kod**. Dwie funkcje, dwa klasyczne
bugi zakresów. Napraw je tak, żeby przeszły testy **i lint** (reguła `no-var`
nie przepuści `var`).

## 1. `makeIndexFns(n)`

Ma zwracać tablicę `n` funkcji, w której funkcja o indeksie `i` zwraca `i`.
Obecnie wszystkie funkcje zwracają `n`.

```js
const fns = makeIndexFns(3);
fns[0](); // ma być 0, jest 3
fns[2](); // ma być 2, jest 3
```

## 2. `labelTemperature(t)`

Ma zwracać `"upał"` dla `t > 30`, w przeciwnym razie `"w normie"`.
Obecnie zawsze zwraca `"w normie"` - nawet dla `t = 40`.

```js
labelTemperature(40); // ma być "upał", jest "w normie"
labelTemperature(20); // "w normie" - to działa
```
