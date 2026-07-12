export function makeGetters(n) {
  const getters = [];
  let i = 0;
  while (i < n) {
    getters.push(() => i);
    i++;
  }
  return getters;
}

export function removeNegatives(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
