# Easy - pierwsze generatory

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwa generatory (`function*`).

## 1. `range(start, end)`

Generator wydający liczby od `start` do `end` włącznie. (To samo co iterowalny range
z poprzedniego zagadnienia, ale teraz w kilku linijkach dzięki `yield`.)

```js
[...range(1, 4)];        // [1, 2, 3, 4]
[...range(5, 5)];        // [5]
[...range(3, 1)];        // []
```

## 2. `take(iterable, n)`

Generator wydający **pierwsze `n`** elementów dowolnego iterable, leniwie. Ma działać
także na nieskończonych generatorach - przerwij po `n` elementach (`return`).

```js
[...take([10, 20, 30], 2)]; // [10, 20]
[...take("abcdef", 3)];     // ["a", "b", "c"]
```

Ponieważ `take` jest generatorem, sam też jest leniwy - nie skonsumuje więcej niż `n`
elementów źródła.
