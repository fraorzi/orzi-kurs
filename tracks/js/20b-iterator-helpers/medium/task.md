# Medium - leniwe wyszukiwanie (`firstMatching`)

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj `firstMatching(iterator, predicate, n)` - zwraca tablicę pierwszych `n`
elementów spełniających `predicate`, **pobierając ze źródła tylko tyle, ile trzeba**.
Kluczowa jest leniwość: gdy zbierzesz `n` trafień, nie wolno ciągnąć dalej z iteratora.

```js
function* naturals() { let i = 1; while (true) yield i++; }

firstMatching(naturals(), (x) => x % 2 === 0, 3); // [2, 4, 6]
```

Ponieważ źródło bywa nieskończone (albo kosztowne), rozwiązanie oparte na materializacji do
tablicy by się zawiesiło albo zrobiło zbędną pracę. Zbuduj leniwy pipeline:
`filter(predicate)` → `take(n)` → `toArray()`.

Test policzy pobrania z generatora `1,2,3,…`: dla 3 pierwszych liczb parzystych wolno
pobrać najwyżej 7 elementów (kanoniczny pipeline pobiera dokładnie 6) - materializacja
pobierałaby bez końca.
