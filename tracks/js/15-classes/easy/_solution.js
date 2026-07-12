export class User {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 2) {
      throw new RangeError("imię musi mieć co najmniej 2 znaki");
    }
    this._name = value;
  }

  sayHi() {
    return `Cześć, ${this.name}`;
  }

  static createGuest() {
    return new User("Gość");
  }
}
