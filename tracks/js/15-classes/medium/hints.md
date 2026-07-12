## Hint 1

`Rabbit extends Animal`; w konstruktorze podklasy `super(name)` MUSI polecieć
przed jakimkolwiek `this.` — inaczej ReferenceError. Nadpisane `stop()` nie
kopiuje logiki rodzica, tylko woła `super.stop()` i dokleja swoje.

## Hint 2

```js
export class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name);
    this.earLength = earLength;
  }
  hide() {
    return `${this.name} się chowa`;
  }
  stop() {
    return `${super.stop()} i ${this.hide()}`;
  }
}
```
