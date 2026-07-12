export function firstDuplicate(arr) {
  // Poprawne, ale O(n²): indexOf skanuje całą tablicę dla każdego elementu.
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) {
      return arr[i];
    }
  }
  return null;
}
