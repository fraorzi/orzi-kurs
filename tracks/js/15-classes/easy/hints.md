## Hint 1

Szkielet: `constructor(name) { this.name = name; }` — to przypisanie
uruchamia Twój setter, więc walidacja pisze się raz. Setter zapisuje do
`this._name`, getter czyta z `this._name` (nazwa musi się różnić od `name`,
inaczej nieskończona rekurencja!).

## Hint 2

```js
export class User {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 2) throw new RangeError("imię za krótkie");
    this._name = value;
  }
  sayHi() {
    return `Cześć, ${this.name}`;
  }
  static createGuest() {
    return new User("Gość");
  }
}
```
