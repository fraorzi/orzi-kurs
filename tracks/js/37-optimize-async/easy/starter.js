export async function loadAll(ids, loadOne) {
  // Poprawne, ale sekwencyjne: każde loadOne czeka na poprzednie (maxActive = 1).
  const results = [];
  for (const id of ids) {
    results.push(await loadOne(id));
  }
  return results;
}
