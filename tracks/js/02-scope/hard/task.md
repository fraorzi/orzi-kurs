# Hard — armia funkcji

Klasyk z javascript.info („Army of functions"). `starter.js` zawiera kompletny,
zepsuty kod: `makeArmy()` tworzy tablicę 10 funkcji-strzelców, a strzelec numer
`i` powinien po wywołaniu zwracać `i`. Zamiast tego **każdy strzelec zwraca 10**.

```js
const army = makeArmy();
army[0](); // ma być 0, jest 10
army[5](); // ma być 5, jest 10
```

Napraw kod. Istnieją co najmniej trzy poprawne podejścia — wybierz dowolne,
ale zrozum wszystkie (hinty przechodzą przez każde).

Wymagania:

- `army.length === 10`,
- `army[i]()` zwraca `i` dla każdego `i`,
- strzelcy są od siebie niezależni.
