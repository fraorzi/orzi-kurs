## Hint 1

W literale obiektu akcesory pisze się słowami `get`/`set` przed nazwą. Getter zwraca
wartość, setter przyjmuje jeden argument. Oba operują na `this` (dlatego zwykłe funkcje,
nie arrow — arrow nie ma własnego `this`).

## Hint 2

```js
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
```

`createTemperature` analogicznie: getter `fahrenheit` liczy `this.celsius * 9 / 5 + 32`,
setter zapisuje `this.celsius = (value - 32) * 5 / 9`.
