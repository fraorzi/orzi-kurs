# Map i Set

`Map` i `Set` to kolekcje wprowadzone w ES2015. `Map` mapuje **dowolne** klucze na
wartości (nie tylko stringi jak obiekt), `Set` przechowuje **unikalne** wartości.
Obie pamiętają **kolejność wstawiania** i mają właściwość `size`.

## Set — zbiór unikalnych wartości

```js
const s = new Set([1, 2, 2, 3]);
s.size;        // 3 — duplikaty odpadają
s.add(3);      // bez zmian, 3 już jest
s.has(2);      // true
s.delete(1);   // usuwa
[...s];        // [2, 3] — kolejność wstawiania
```

Najczęstsze zastosowanie: **deduplikacja** — `[...new Set(arr)]` albo `Array.from(new Set(arr))`.

Równość kluczy to **SameValueZero**: `NaN` jest równe `NaN` (inaczej niż `===`),
a `+0` i `-0` to ten sam element.

## Map — słownik z dowolnymi kluczami

```js
const m = new Map();
m.set("klucz", 1);
const objKey = { id: 1 };
m.set(objKey, "wartość");  // klucz to referencja do obiektu!
m.get(objKey);             // "wartość"
m.get({ id: 1 });          // undefined — inny obiekt, inna referencja
m.size;                    // 2
m.has("klucz");            // true
```

Metody: `set` (zwraca mapę → można łańcuchować `m.set(a,1).set(b,2)`), `get`, `has`,
`delete`, `clear`, `size`.

## Iteracja i kolejność

`Map` i `Set` są iterowalne, w kolejności wstawiania:

```js
for (const [k, v] of map) { /* ... */ }   // Map iteruje pary [klucz, wartość]
for (const v of set) { /* ... */ }
map.keys(); map.values(); map.entries();  // iteratory
```

## Konwersje Object ↔ Map

```js
const map = new Map(Object.entries({ a: 1, b: 2 })); // obiekt → Map
const obj = Object.fromEntries(map);                 // Map → obiekt
```

Uwaga: `Object.fromEntries` zadziała tylko, gdy klucze mapy są stringami/symbolami.

## Kiedy używać Map zamiast obiektu

- **Klucze nie-stringowe** (obiekty, liczby zachowujące typ) — obiekt zamienia klucze
  na stringi (`obj[1]` i `obj["1"]` to to samo pole; w Map `1` i `"1"` to różne klucze).
- **Częste dodawanie/usuwanie** i pytanie o rozmiar (`size` w O(1) vs `Object.keys().length`).
- **Gwarantowana kolejność** wszystkich kluczy (obiekt ma zawiłe reguły dla kluczy
  liczbowych — są sortowane rosnąco).
- **Brak kolizji** z odziedziczonymi kluczami (`"toString"`, `"__proto__"` w obiekcie
  bywają groźne; Map nie ma prototypowych pułapek).

## Kiedy używać Set

- Deduplikacja i szybkie `has` (test przynależności w O(1) zamiast `array.includes` O(n)).
- Śledzenie „widzianych" elementów (odwiedzone węzły, przetworzone id).
- Operacje na zbiorach (część wspólna, suma, różnica).

## Kiedy unikać

- Prosty rekord o znanych, stringowych kluczach → zwykły obiekt/`{}` jest czytelniejszy
  i lepiej się serializuje do JSON (Map **nie** serializuje się przez `JSON.stringify`
  — daje `{}`).
- Gdy potrzebujesz metod/gettery na wartości → klasa lub obiekt.

## Pułapki

- **Klucze obiektowe po referencji, nie po wartości** — `map.get({id:1})` po
  `map.set({id:1}, ...)` da `undefined` (dwa różne obiekty).
- `JSON.stringify(map)` → `"{}"`. Serializuj przez `Object.fromEntries` albo `[...map]`.
- `Set` deduplikuje przez SameValueZero — obiekty o tej samej treści to **różne**
  elementy (znów: referencja).
- `map.size` to właściwość, nie metoda — `map.size`, nie `map.size()`.
- Nie iteruj `for..in` po Map/Set — to nie zadziała jak myślisz; używaj `for..of`.
