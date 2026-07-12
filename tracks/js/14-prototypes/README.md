# Prototypy

Każdy obiekt ma ukryte pole `[[Prototype]]` — referencję do innego obiektu
(albo `null`). Gdy czytasz właściwość, której obiekt nie ma, silnik szuka jej
**w prototypie, potem w prototypie prototypu** — aż do `null`. To łańcuch
prototypów.

```js
const animal = { eats: true };
const rabbit = Object.create(animal); // rabbit --[[Prototype]]--> animal
rabbit.jumps = true;

rabbit.eats;  // true — znalezione w prototypie
rabbit.jumps; // true — własne
```

Dostęp do prototypu: `Object.getPrototypeOf(obj)` / `Object.setPrototypeOf`
(settera unikaj — patrz niżej). Zapis `__proto__` jest przestarzały.

## Odczyt idzie po łańcuchu, zapis NIE

```js
rabbit.eats = false; // tworzy WŁASNĄ właściwość na rabbit
animal.eats;         // true — prototyp nietknięty
```

## Własne vs odziedziczone

```js
Object.hasOwn(rabbit, "jumps"); // true — własna
Object.hasOwn(rabbit, "eats");  // false — z prototypu
"eats" in rabbit;               // true — `in` patrzy na cały łańcuch
```

`for..in` iteruje po własnych **i odziedziczonych** enumerowalnych kluczach —
kolejna różnica względem `Object.keys` (tylko własne).

## F.prototype i new

Funkcja wywołana z `new` tworzy obiekt, którego `[[Prototype]]` to
`F.prototype` (właściwość funkcji o tej nazwie — nie mylić z `[[Prototype]]`
samej funkcji!):

```js
function Queue() { this.items = []; }
Queue.prototype.enqueue = function (x) { this.items.push(x); };

const q = new Queue();
// q --[[Prototype]]--> Queue.prototype --[[Prototype]]--> Object.prototype
```

Metody na `F.prototype` są **współdzielone** przez wszystkie instancje — to
mechanizm, na którym zbudowane są klasy (`class` to cukier składniowy nad tym).

Domyślny `F.prototype` ma jedną właściwość: `constructor` wskazujący z powrotem
na `F`. Nadpisując cały `F.prototype` obiektem literałowym, gubisz `constructor`.

## Natywne prototypy

`[1,2].map` żyje na `Array.prototype`, `"a".toUpperCase` na `String.prototype`.
`instanceof` sprawdza, czy `Ctor.prototype` występuje w łańcuchu obiektu.

## Kiedy używać

- `Object.create(proto)` do obiektów z fallbackiem (konfiguracje, defaulty),
- `F.prototype` / klasy do współdzielenia metod między instancjami,
- `Object.hasOwn` przy iteracji, gdy obiekt może mieć odziedziczone klucze.

## Kiedy unikać

- modyfikowania natywnych prototypów (`Array.prototype.myHelper = ...`) —
  globalny efekt uboczny, konflikty z przyszłymi metodami języka,
- `Object.setPrototypeOf` na istniejących obiektach — silniki deoptymalizują
  taki obiekt na stałe; ustawiaj prototyp przy tworzeniu (`Object.create`),
- głębokich łańcuchów prototypów jako "architektury" — kompozycja jest prostsza.

## Pułapki

- zapis przez obiekt nigdy nie zmienia prototypu (patrz wyżej) — mylące przy
  współdzielonych obiektach konfiguracyjnych,
- `for..in` widzi odziedziczone enumerowalne klucze — filtruj `Object.hasOwn`,
- po `F.prototype = { ... }` instancje mają `constructor === Object` — dodaj
  `constructor: F` albo definiuj metody pojedynczo,
- `Object.create(null)` tworzy obiekt BEZ prototypu — nie ma nawet `toString`;
  przydatny jako czysty słownik, zaskakujący wszędzie indziej.
