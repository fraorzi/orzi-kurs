# Hard — dekoratory: spy i once

Dekorator to funkcja, która przyjmuje funkcję i zwraca jej „opakowaną" wersję —
działającą tak samo, ale z dodatkowym zachowaniem. Zaimplementuj dwa klasyki.

## 1. `spy(fn)`

Zwraca wrapper, który działa dokładnie jak `fn`, ale zapisuje argumenty każdego
wywołania we właściwości `calls` wrappera — jako **tablicę tablic argumentów**.

```js
const add = (a, b) => a + b;
const spied = spy(add);

spied(1, 2);   // 3 — wynik fn bez zmian
spied(4, 5);   // 9

spied.calls;   // [[1, 2], [4, 5]]
```

Wymagania:

- `wrapper.calls` istnieje i jest pustą tablicą jeszcze przed pierwszym wywołaniem,
- wrapper zwraca wynik `fn` bez zmian,
- wrapper forwarduje `this` (użyj `fn.apply(this, args)`) — szpiegowana metoda
  obiektu ma dalej widzieć swój obiekt.

## 2. `once(fn)`

Zwraca wrapper, który wywoła `fn` **najwyżej raz** — przy pierwszym wywołaniu,
z jego `this` i argumentami. Wynik zostaje zapamiętany; każde kolejne wywołanie
zwraca go bez uruchamiania `fn` (argumenty kolejnych wywołań są ignorowane).

```js
let runs = 0;
const init = once((label) => {
  runs++;
  return `start: ${label}`;
});

init("a"); // "start: a" — fn wykonane
init("b"); // "start: a" — fn NIE wykonane, wynik z pamięci
runs;      // 1
```
