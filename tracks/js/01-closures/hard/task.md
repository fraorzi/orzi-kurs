# Hard — armia funkcji i szpieg

## 1. Napraw `makeArmy()`

W `starter.js` jest gotowy, **zepsuty** kod. Ma tworzyć 10 „shooterów" — funkcji,
z których każda zwraca swój numer (0–9). Obecnie wszystkie zwracają `10`.

```js
const army = makeArmy();
army[0](); // ma być 0, jest 10
army[5](); // ma być 5, jest 10
```

Zanim naprawisz: zrozum **dlaczego** wszystkie zwracają 10. Napraw tak, żeby każdy
shooter pamiętał własny numer. Nie zmieniaj sygnatury ani liczby shooterów.

## 2. `spy(fn)`

Dekorator-szpieg: zwraca wrapper, który działa jak `fn`, ale zapisuje każde wywołanie
w tablicy `wrapper.calls` — jako obiekt `{ args, result }`.

```js
const add = (a, b) => a + b;
const spied = spy(add);

spied(1, 2); // 3
spied(4, 5); // 9

spied.calls;
// [
//   { args: [1, 2], result: 3 },
//   { args: [4, 5], result: 9 },
// ]
```

Wrapper musi zwracać wyniki `fn` bez zmian.
