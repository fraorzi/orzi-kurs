export class Animal {
  constructor(name) {
    this.name = name;
    this.speed = 0;
  }

  run(speed) {
    this.speed = speed;
    return `${this.name} biegnie z prędkością ${speed}`;
  }

  stop() {
    this.speed = 0;
    return `${this.name} stoi`;
  }
}

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
