export function createCalculator() {
  return {
    read(a, b) {
      this.a = a;
      this.b = b;
    },
    sum() {
      return this.a + this.b;
    },
    mul() {
      return this.a * this.b;
    },
  };
}

export function createLadder() {
  return {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    getStep() {
      return this.step;
    },
  };
}
