# Medium - dekoratory: once i memoize

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Zaimplementuj w `starter.js` dwa dekoratory (funkcje opakowujące inne funkcje).

## 1. `once(fn)`

Zwraca wrapper, który wykona `fn` **dokładnie raz** - przy pierwszym wywołaniu.
Kolejne wywołania nie uruchamiają `fn`, tylko zwracają zapamiętany wynik pierwszego.

```js
let runs = 0;
const init = once(() => ++runs);
init(); // 1  (fn wykonane)
init(); // 1  (fn NIE wykonane, wynik z pamięci)
runs;   // 1
```

## 2. `memoize(fn)`

Zwraca wrapper cache'ujący wyniki. `fn` przyjmuje **jeden argument** (prymityw).
Dla argumentu, który już był, `fn` nie jest wywoływane ponownie - wynik pochodzi z cache.
Każde opakowanie ma własny, niezależny cache.

```js
const slowSquare = (x) => x * x; // wyobraź sobie, że to kosztowne
const fast = memoize(slowSquare);
fast(4); // 16 - policzone
fast(4); // 16 - z cache, slowSquare nie wywołane
fast(5); // 25 - policzone
```

Wrapper ma przekazywać argument i zwracać wynik dokładnie tak, jak oryginalne `fn`.
