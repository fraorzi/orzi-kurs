function run(step, n) {
  let result = step(n);
  while (typeof result === "function") {
    result = result();
  }
  return result;
}

function evenStep(n) {
  return n === 0 ? true : () => oddStep(n - 1);
}

function oddStep(n) {
  return n === 0 ? false : () => evenStep(n - 1);
}

export function isEven(n) {
  return run(evenStep, n);
}

export function isOdd(n) {
  return run(oddStep, n);
}
