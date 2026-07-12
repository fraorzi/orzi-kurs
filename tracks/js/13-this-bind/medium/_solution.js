export function partial(fn, ...preset) {
  return function (...args) {
    return fn.call(this, ...preset, ...args);
  };
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
  return callTwice(user.greet.bind(user));
}
