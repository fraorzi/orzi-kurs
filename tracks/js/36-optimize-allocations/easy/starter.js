export function flatten(arrays) {
  // Poprawne, ale O(n²): [...acc, ...arr] kopiuje cały akumulator w każdym kroku.
  return arrays.reduce((acc, arr) => [...acc, ...arr], []);
}
