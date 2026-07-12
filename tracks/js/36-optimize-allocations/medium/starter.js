export function mergeAll(objects) {
  // Poprawne, ale O(n²): { ...acc, ...o } kopiuje wszystkie dotychczasowe klucze co krok.
  return objects.reduce((acc, o) => ({ ...acc, ...o }), {});
}
