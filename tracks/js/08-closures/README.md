# Domknięcia (closures)

Domknięcie to funkcja, która **pamięta zmienne z miejsca, w którym została utworzona** —
nawet gdy jest wywoływana dużo później i gdzie indziej. W JS każda funkcja jest domknięciem:
przy tworzeniu dostaje odnośnik do swojego zewnętrznego środowiska leksykalnego.

## Scope leksykalny

O tym, co widzi funkcja, decyduje **miejsce jej zapisania w kodzie**, nie miejsce wywołania:

```js
function outer() {
  const secret = 42;
  function inner() {
    return secret; // inner widzi secret, bo powstała wewnątrz outer
  }
  return inner;
}

const fn = outer();
fn(); // 42 — mimo że outer dawno się zakończyła
```

Kluczowe: domknięcie trzyma **referencję do zmiennej, nie kopię wartości**. Jeśli zmienna
się zmieni, domknięcie widzi nową wartość.

## Wzorzec: prywatny stan

Zmienna `count` nie jest dostępna z zewnątrz — może ją zmieniać tylko zwrócona funkcja:

```js
function makeCounter() {
  let count = 0;
  return function () {
    return count++;
  };
}

const counter = makeCounter();
counter(); // 0
counter(); // 1

const other = makeCounter();
other(); // 0 — każde wywołanie makeCounter tworzy NOWE środowisko
```

## Wzorzec: funkcja zwracająca funkcję (częściowa aplikacja)

```js
function multiply(a) {
  return function (b) {
    return a * b; // a jest zapamiętane w domknięciu
  };
}

const double = multiply(2);
double(5); // 10
```

## Wzorzec: dekorator (wrapper)

Funkcja opakowująca inną funkcję i dodająca zachowanie — cache, licznik wywołań, throttle.
Stan wrappera żyje w domknięciu:

```js
function countCalls(fn) {
  let calls = 0;
  return function (...args) {
    calls++;
    return fn.apply(this, args);
  };
}
```

`fn.apply(this, args)` przekazuje oryginalny kontekst i argumenty — dzięki temu wrapper
jest przezroczysty dla kodu, który go używa.

## Pułapka: wspólna zmienna w pętli

Wszystkie funkcje utworzone w pętli mogą domykać **tę samą** zmienną:

```js
const fns = [];
let i = 0;
while (i < 3) {
  fns.push(() => i); // każda funkcja trzyma referencję do TEJ SAMEJ i
  i++;
}
fns[0](); // 3, nie 0!
```

Rozwiązania: `for (let j = 0; ...)` — `let` w nagłówku `for` tworzy nową zmienną na każdą
iterację — albo skopiowanie wartości do lokalnej stałej wewnątrz iteracji.

## Kiedy tego używasz w praktyce

- handlery zdarzeń pamiętające kontekst,
- `debounce`/`throttle`/`memoize` (całe lodash/underscore to dekoratory na domknięciach),
- hooki Reacta — stale closures to najczęstszy bug w `useEffect`,
- moduły z prywatnym stanem.

## Kiedy unikać

- Nie ukrywaj dużego, długo żyjącego stanu w domknięciu bez jawnego API czyszczenia.
- Nie używaj closure jako zamiennika prostego parametru, jeśli zależność może być jawna.
- Uważaj na wrappery, które przypadkiem zmieniają `this`, argumenty albo wartość zwrotną.
