export function createUser(name, surname) {
  return {
    name,
    surname,
    get fullName() {
      return `${this.name} ${this.surname}`;
    },
    set fullName(value) {
      [this.name, this.surname] = value.split(" ");
    },
  };
}

export function createTemperature(celsius) {
  return {
    celsius,
    get fahrenheit() {
      return this.celsius * 9 / 5 + 32;
    },
    set fahrenheit(value) {
      this.celsius = (value - 32) * 5 / 9;
    },
  };
}
