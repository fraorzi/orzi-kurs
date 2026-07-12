# Funkcje: deklaracja, wyrażenie, arrow

Trzy sposoby zdefiniowania funkcji — różnią się nie tylko składnią, ale i zachowaniem
(hoisting, `this`, `arguments`):

```js
function greet(name) { return `Cześć, ${name}!`; }        // deklaracja
const greet = function (name) { return `Cześć, ${name}!`; }; // wyrażenie
const greet = (name) => `Cześć, ${name}!`;                   // arrow
```

## Deklaracja vs wyrażenie: hoisting

Deklaracja funkcji jest przetwarzana **przed uruchomieniem kodu** — można ją wywołać
wyżej, niż jest zapisana:

```js
sayHi(); // "hej" — działa

function sayHi() {
  console.log("hej");
}
```

Wyrażenie funkcyjne powstaje dopiero, gdy wykonanie **dojdzie do przypisania**.
Wcześniej zmiennej po prostu nie ma:

```js
sayHi(); // ReferenceError (const/let) albo TypeError (var — zmienna jest, ale undefined)

const sayHi = function () {
  console.log("hej");
};
```

## Arrow functions

Zwięzła składnia: pojedyncze wyrażenie nie potrzebuje `return` ani klamer,
jeden parametr nie potrzebuje nawiasów:

```js
const double = (n) => n * 2;
const zero = () => 0;
const sum = (a, b) => a + b;
```

Arrow **nie ma własnego `this` ani `arguments`** — bierze je z otaczającego kodu.
To zaleta w callbackach (nie gubisz kontekstu), wada w metodach obiektów (patrz pułapki).

## Parametry domyślne

Wartość domyślna wchodzi do gry, gdy argument to `undefined` (brak argumentu
albo jawnie przekazane `undefined` — ale NIE `null`):

```js
function greet(name, greeting = "Cześć") {
  return `${greeting}, ${name}!`;
}

greet("Ala");            // "Cześć, Ala!"
greet("Ala", undefined); // "Cześć, Ala!"
greet("Ala", "Hej");     // "Hej, Ala!"
```

Wyrażenie domyślne jest **obliczane przy każdym wywołaniu**, nie raz przy definicji:

```js
function push(item, arr = []) {
  arr.push(item);
  return arr;
}
push(1); // [1]
push(2); // [2] — świeża tablica za każdym razem (inaczej niż np. w Pythonie)
```

## Rest `...args` vs `arguments`

Rest zbiera „resztę" argumentów w **prawdziwą tablicę** — działa `map`, `reduce` itd.:

```js
function sumAll(...nums) {
  return nums.reduce((total, n) => total + n, 0);
}
sumAll(1, 2, 3); // 6
```

`arguments` to relikt: obiekt tablicopodobny (bez metod tablicy), zawiera zawsze
wszystkie argumenty i **nie istnieje w arrow functions**. W nowym kodzie używaj rest.

## Funkcje jako wartości

Funkcja to zwykła wartość — można ją przypisać, przekazać jako argument i zwrócić
z innej funkcji:

```js
const twice = (fn, x) => fn(fn(x));
twice((n) => n + 3, 10); // 16

function compose2(f, g) {
  return (x) => f(g(x)); // najpierw g, potem f
}
```

Na tym stoją dekoratory — funkcje opakowujące inne funkcje (logowanie, cache,
ograniczenie wywołań), nie zmieniając ich kodu.

## Kiedy używać której formy

- **deklaracja** — nazwane funkcje „narzędziowe" w module; hoisting pozwala trzymać
  główną logikę na górze pliku, szczegóły niżej,
- **arrow** — callbacki (`map`, `filter`, handlery), krótkie funkcje pomocnicze,
  wszędzie gdzie `this` ma zostać z otoczenia,
- **wyrażenie `function`** — gdy funkcja ma mieć własne `this` (metody, dekoratory
  forwardujące kontekst).

## Kiedy unikać arrow

- metody obiektów i klas korzystające z `this`,
- funkcje-dekoratory, które mają przekazywać `this` dalej,
- wszędzie, gdzie potrzebujesz `arguments` (choć rest zwykle wystarcza).

## Pułapka: wywołanie wyrażenia przed przypisaniem

Deklarację można wywołać przed definicją, wyrażenia — nie. Refaktor
`function f() {}` → `const f = () => {}` potrafi wywrócić kod, który wołał `f`
wcześniej w pliku.

## Pułapka: arrow jako metoda obiektu

```js
const counter = {
  count: 0,
  increment: () => {
    this.count++; // this NIE wskazuje na counter — arrow nie ma własnego this
  },
};
```

Metody pisz jako `increment() { ... }` albo `increment: function () { ... }`.

## Pułapka: parametr domyślny z wywołaniem funkcji

```js
function log(message, time = getTime()) { ... }
```

`getTime()` wykona się przy **każdym** wywołaniu bez drugiego argumentu — jeśli jest
kosztowne albo ma efekty uboczne, zrobi je wielokrotnie. To też feature: `arr = []`
daje świeżą tablicę na każde wywołanie.
