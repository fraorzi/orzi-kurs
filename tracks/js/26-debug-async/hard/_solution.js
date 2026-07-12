export async function fetchAll(ids, fetchOne) {
  return Promise.all(ids.map(fetchOne));
}
