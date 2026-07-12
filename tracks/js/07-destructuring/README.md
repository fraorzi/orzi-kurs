# Destructuring, spread i rest

Destrukturyzacja "rozpakowuje" tablice i obiekty do zmiennych; spread i rest
to jej lustrzane odbicie — składanie i zbieranie.

## Tablice

```js
const [first, second] = ["a", "b", "c"]; // first="a", second="b"
const [, , third] = ["a", "b", "c"];     // pomijanie przecinkami
const [head, ...tail] = [1, 2, 3];       // head=1, tail=[2, 3]
const [x = 0, y = 0] = [5];              // x=5, y=0 — default przy undefined
[a, b] = [b, a];                          // idiom: zamiana wartości
```

## Obiekty

```js
const { name, age } = user;
const { name: fullName } = user;          // zmiana nazwy zmiennej
const { role = "user" } = config;         // default
const { name, ...rest } = user;           // rest zbiera pozostałe klucze
const { address: { city } } = user;       // zagnieżdżona — uwaga: address musi istnieć!
```

## W parametrach funkcji — wzorzec options object

Zamiast pozycyjnych argumentów, których kolejność trzeba pamiętać:

```js
function createUser({ name, age = 18, admin = false }) { ... }
createUser({ name: "Ala", admin: true }); // kolejność bez znaczenia, defaults działają
```

## Spread

```js
const copy = [...arr];                  // płytka kopia tablicy
const merged = { ...defaults, ...user }; // późniejsze klucze NADPISUJĄ wcześniejsze
const all = [...listA, ...listB];        // konkatenacja
Math.max(...numbers);                    // rozsypanie do argumentów
```

## Kiedy używać

- options object z destrukturyzacją i defaults w każdej funkcji z >2 parametrami,
- rest `...` zamiast `arguments` (prawdziwa tablica, działa w arrow),
- spread do płytkich kopii i łączenia — czytelniejszy niż `Object.assign`/`concat`,
- destrukturyzacja w pętli po `Object.entries(obj)`: `for (const [key, value] of ...)`.

## Kiedy unikać

- głębokiej zagnieżdżonej destrukturyzacji (`{ a: { b: { c } } }`) — nieczytelna
  i rzuca przy brakujących poziomach; rozbij na dwa kroki,
- destrukturyzacji, gdy używasz wartości raz — `obj.name` bywa prostsze,
- spreada do kopii głębokich struktur — kopiuje tylko pierwszy poziom.

## Pułapki

- destrukturyzacja `null`/`undefined` rzuca TypeError: `const { a } = null` —
  zabezpieczenie: `= obj ?? {}`,
- defaults reagują TYLKO na `undefined`: `const { x = 5 } = { x: null }` daje
  `x === null`,
- spread obiektów kopiuje płytko — zagnieżdżenia współdzielone,
- destrukturyzacja obiektu do istniejących zmiennych wymaga nawiasów:
  `({ a, b } = obj);` — bez nich `{` zaczyna blok.
