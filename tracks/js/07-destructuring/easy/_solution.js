export function firstAndLast(arr) {
  const [first] = arr;
  return { first, last: arr.at(-1) };
}

export function swapped(pair) {
  const [a, b] = pair;
  return [b, a];
}

export function fullName({ first, last }) {
  return last ? `${first} ${last}` : first;
}
