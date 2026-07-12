export function firstUnique(arr) {
  // Poprawne, ale O(n²): indexOf + lastIndexOf (każde O(n)) dla każdego elementu.
  return arr.find((x) => arr.indexOf(x) === arr.lastIndexOf(x));
}
