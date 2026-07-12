# Hard — options object, zip i partition

Zaimplementuj w `starter.js` trzy funkcje.

## 1. `normalizeUser(options)`

Wzorzec options object z walidacją. Sygnatura destrukturyzuje w parametrze:
`{ name, age = 18, ...rest }`.

- brak `name`, pusty string albo same białe znaki → `throw new TypeError(...)`,
- zwróć `{ name, age, meta }`, gdzie `name` jest przycięte (`trim`),
  `age` przekonwertowane na number, a `meta` to obiekt z **pozostałymi** kluczami.

```js
normalizeUser({ name: "  Ala ", role: "admin" });
// { name: "Ala", age: 18, meta: { role: "admin" } }
normalizeUser({ name: "Jan", age: "30", city: "Łódź", vip: true });
// { name: "Jan", age: 30, meta: { city: "Łódź", vip: true } }
normalizeUser({});          // TypeError
normalizeUser({ name: " " }); // TypeError
```

## 2. `zip(...arrays)`

Rest w sygnaturze: dowolna liczba tablic → tablica krotek. Długość wyniku =
długość **najkrótszej** tablicy (semantyka `zip` z Pythona).

```js
zip([1, 2, 3], ["a", "b"]);        // [[1, "a"], [2, "b"]]
zip([1, 2], ["a", "b"], [true]);   // [[1, "a", true]]
zip();                              // []
```

## 3. `partition(arr, pred)`

Jak `_.partition`: para tablic `[pass, fail]` — elementy spełniające
i niespełniające predykatu, w oryginalnej kolejności. Wynik ma się dać
destrukturyzować: `const [evens, odds] = partition(...)`.

```js
partition([1, 2, 3, 4], (x) => x % 2 === 0); // [[2, 4], [1, 3]]
partition([], (x) => x);                      // [[], []]
```
