export async function loadAll(ids, loadOne) {
  return Promise.all(ids.map(loadOne));
}
