export function partial(fn, ...preset) {
  // TODO
}

export const user = {
  name: "Ala",
  greet() {
    return `Cześć, ${this.name}`;
  },
};

export function callTwice(fn) {
  return [fn(), fn()];
}

export function greetTwiceBroken() {
  return callTwice(user.greet);
}
