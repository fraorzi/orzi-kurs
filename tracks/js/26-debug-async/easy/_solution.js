export async function loadName(fetchUser) {
  const user = await fetchUser();
  return user.name;
}

export async function loadTotal(fetchA, fetchB) {
  const a = await fetchA();
  const b = await fetchB();
  return a + b;
}
