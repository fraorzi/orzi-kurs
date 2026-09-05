# Medium - partial i utrata this

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## 1. `partial(fn, ...preset)`

Częściowa aplikacja (javascript.info, „Function binding"): zwraca funkcję,
która wywołuje `fn` z argumentami `preset` doklejonymi z przodu - i przekazuje
**this z miejsca wywołania wrappera** (w przeciwieństwie do `bind`, który
przyspawuje kontekst na sztywno).

```js
const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
add5(1, 2); // 8

const user = {
  name: "Ala",
  greet: partial(function (greeting, punct) {
    return `${greeting}, ${this.name}${punct}`;
  }, "Cześć"),
};
user.greet("!"); // "Cześć, Ala!" - this to user, bo wywołanie user.greet(...)
```

## 2. Napraw `greetTwiceBroken` (kod w starterze)

`starter.js` zawiera działający obiekt `user` i funkcję `callTwice(fn)` -
oraz zepsutą funkcję `greetTwiceBroken()`, która przekazuje `user.greet`
do `callTwice` i **gubi this** (wynik: `"Cześć, undefined"`).
To zadanie „Fix a function that loses this" z javascript.info.

Napraw TYLKO `greetTwiceBroken` (nie zmieniaj `user` ani `callTwice`), tak by:

```js
greetTwiceBroken(); // ["Cześć, Ala", "Cześć, Ala"]
```
