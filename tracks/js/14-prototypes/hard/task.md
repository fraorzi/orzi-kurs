# Hard — spacer po łańcuchu

Trzy funkcje wymagające ręcznego chodzenia po łańcuchu prototypów.

## 1. `myInstanceOf(value, Ctor)`

Własny `instanceof` (wg opisu MDN): czy `Ctor.prototype` występuje w łańcuchu
prototypów `value`?

- prymitywy (w tym `null`/`undefined`) → `false`,
- wspinaj się przez `Object.getPrototypeOf` aż do `null`.

```js
class Animal {}
class Rabbit extends Animal {}
const r = new Rabbit();

myInstanceOf(r, Rabbit);  // true
myInstanceOf(r, Animal);  // true — prototypy dziedziczą
myInstanceOf(r, Date);    // false
myInstanceOf(42, Number); // false — prymityw
myInstanceOf([], Array);  // true
```

## 2. `getDefiningObject(obj, key)`

Pierwszy obiekt w łańcuchu (zaczynając od `obj`), który ma `key` jako **własną**
właściwość — albo `null`, gdy nikt jej nie ma.

```js
const base = { x: 1 };
const mid = Object.create(base);
const top = Object.create(mid);

getDefiningObject(top, "x"); // base
getDefiningObject(top, "y"); // null
```

## 3. `listProps(obj)`

Zwraca `{ own, inherited }`:

- `own` — własne enumerowalne klucze,
- `inherited` — enumerowalne klucze z łańcucha prototypów **bez**
  `Object.prototype` i bez duplikatów (klucz przesłonięty własnym nie jest
  "inherited").

Obie tablice posortowane alfabetycznie.

```js
const animal = { eats: true, alive: true };
const rabbit = Object.create(animal);
rabbit.jumps = true;
rabbit.eats = false; // przesłania eats z prototypu

listProps(rabbit);
// { own: ["eats", "jumps"], inherited: ["alive"] }
```
