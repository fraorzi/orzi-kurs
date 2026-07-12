# Zmienne i zakresy: let, const, var

Trzy słowa kluczowe, dwa zupełnie różne modele zakresu. `let` i `const` żyją
w **bloku** (`{ ... }`), `var` — w całej **funkcji**, niezależnie od bloków:

```js
{
  let a = 1;
  var b = 2;
}
a; // ReferenceError — blok się skończył
b; // 2 — var "wyciekł" z bloku
```

## Hoisting i TDZ

Deklaracje `var` są przetwarzane przed uruchomieniem funkcji: zmienna istnieje
od pierwszej linii, ale z wartością `undefined`. `let`/`const` też są "widziane"
z góry, ale dostęp przed linią deklaracji rzuca błąd — strefa między początkiem
bloku a deklaracją to **temporal dead zone (TDZ)**:

```js
console.log(a); // undefined — var wyhoistowany
console.log(b); // ReferenceError — TDZ
var a = 1;
let b = 2;
```

## Pętla `for (let ...)` — nowa zmienna na iterację

Najważniejsza praktyczna różnica: `let` w nagłówku `for` tworzy **osobną zmienną
dla każdej iteracji**. `var` (albo zmienna zadeklarowana przed pętlą) jest jedna,
wspólna — i wszystkie funkcje utworzone w pętli widzą jej **końcową** wartość:

```js
const fns = [];
for (var i = 0; i < 3; i++) fns.push(() => i);
fns[0](); // 3 — wszystkie domykają TĘ SAMĄ i

for (let j = 0; j < 3; j++) fns.push(() => j);
fns[3](); // 0 — każda iteracja ma własną j
```

## Shadowing

Deklaracja w bloku wewnętrznym **przesłania** zmienną zewnętrzną o tej samej
nazwie. Zewnętrzna nie zmienia się — wewnętrzna to zupełnie inna zmienna:

```js
let status = "off";
if (enabled) {
  let status = "on"; // NOWA zmienna, żyje tylko w tym bloku
}
status; // "off" — jeśli chcesz nadpisać, przypisz zamiast deklarować
```

## Prywatny stan przez zakres

Zmienna zamknięta w zakresie funkcji jest niedostępna z zewnątrz — to podstawowy
sposób na prywatny stan (wzorzec modułu, poprzednik pól prywatnych klas):

```js
function createCounter() {
  let count = 0; // nikt z zewnątrz jej nie dotknie
  return { increment: () => ++count, get: () => count };
}
```

## Kiedy używać

- `const` domyślnie — wszędzie tam, gdzie nie ma ponownego przypisania,
- `let` tylko, gdy wartość faktycznie się zmienia (liczniki, akumulatory),
- zakres funkcyjny do ukrywania stanu (moduły, fabryki).

## Kiedy unikać

- `var` — w nowym kodzie nigdy; w tym repo lint blokuje go regułą `no-var`,
- deklarowania zmiennych "na zapas" na górze funkcji — deklaruj najbliżej użycia,
- shadowingu nazw z zakresu zewnętrznego — legalny, ale to prosta droga do bugów.

## Pułapki

- `var` w pętli + callbacki: wszystkie domykają jedną zmienną (patrz wyżej),
- `const obj = {}` nie mrozi obiektu — blokuje tylko ponowne **przypisanie**;
  `obj.x = 1` jest legalne,
- ponowna deklaracja `var` tej samej nazwy przechodzi bez błędu i po cichu
  nadpisuje; `let`/`const` rzucają SyntaxError,
- przypadkowy shadowing: `let x = ...` w bloku zamiast `x = ...` sprawia,
  że zewnętrzna zmienna nigdy nie dostaje nowej wartości.
