# Klasy

`class` to składnia nad prototypami z poprzedniego zagadnienia: metody lądują
na `User.prototype`, `new` tworzy obiekt z tym prototypem. Ale to nie tylko
cukier — klasy wymuszają `new`, ich metody są nieenumerowalne, a ciało działa
w strict mode.

```js
class User {
  constructor(name) {
    this.name = name;       // pola instancji
  }
  sayHi() {                 // metoda — trafia na User.prototype
    return `Cześć, ${this.name}`;
  }
  get initial() {           // getter — czytany jak właściwość
    return this.name[0];
  }
  set name(value) { ... }   // setter — walidacja przy przypisaniu
  static createGuest() {    // statyczna — na klasie, nie na instancji
    return new User("Gość");
  }
}
```

## Dziedziczenie

```js
class Animal {
  constructor(name) { this.name = name; }
  run() { return `${this.name} biegnie`; }
}

class Rabbit extends Animal {
  constructor(name, ears) {
    super(name);            // OBOWIĄZKOWE przed użyciem this!
    this.ears = ears;
  }
  run() {
    return super.run() + " i kica"; // super.metoda() — wersja rodzica
  }
}
```

Bez własnego konstruktora `super` jest wywoływany automatycznie z argumentami.

## Pola prywatne

```js
class Account {
  #balance = 0;             // niedostępne poza klasą — twarda prywatność
  deposit(amount) { this.#balance += amount; }
  get balance() { return this.#balance; }
}
new Account().#balance;     // SyntaxError!
```

## Rozszerzanie wbudowanych

```js
class PowerArray extends Array {
  isEmpty() { return this.length === 0; }
}
const arr = new PowerArray(1, 2, 3);
arr.filter((x) => x > 1);   // też PowerArray — metody wbudowane używają
                            // this.constructor do tworzenia wyników
```

## Kiedy używać

- wiele instancji z tym samym zachowaniem i stanem per obiekt,
- dziedziczenie 1 poziom (specjalizacja: `AppError extends Error`),
- pola `#` do stanu, który naprawdę ma być nietykalny,
- statyczne fabryki (`User.fromJson(...)`) zamiast przeciążania konstruktora.

## Kiedy unikać

- klasa z samymi metodami statycznymi — to zwykły moduł z funkcjami,
- głębokie hierarchie dziedziczenia — kompozycja skaluje się lepiej,
- klasa dla jednej instancji — literał obiektu albo funkcja fabryczna wystarczy.

## Pułapki

- zapomniane `super()` w konstruktorze podklasy → ReferenceError przy `this`,
- metody klasy NIE są związane z instancją — `const f = obj.method` nadal
  gubi this (klasy nie naprawiają niczego z zagadnienia 13),
- pola instancji (`x = 1` w ciele klasy) są per instancja, metody — wspólne;
  arrow jako pole (`handler = () => ...`) wiąże this, ale kosztuje kopię
  na każdą instancję,
- `extends Array`: metody zwracają podklasę — czasem to zaleta, czasem
  zaskoczenie (można wrócić do Array przez `static get [Symbol.species]`).
