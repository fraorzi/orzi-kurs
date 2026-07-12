export async function loadName(fetchUser) {
  const user = fetchUser();
  return user.name;
}

export async function loadTotal(fetchA, fetchB) {
  const a = await fetchA();
  const b = fetchB();
  return a + b;
}
