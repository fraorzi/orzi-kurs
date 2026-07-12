export function makeGetters(n) {
  const getters = [];
  for (let i = 0; i < n; i++) {
    getters.push(() => i);
  }
  return getters;
}

export function removeNegatives(arr) {
  return arr.filter((x) => x >= 0);
}
