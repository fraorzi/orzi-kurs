export function uniqueByEmail(users) {
  const seen = new Set();
  const result = [];
  for (const user of users) {
    if (!seen.has(user.email)) {
      seen.add(user.email);
      result.push(user);
    }
  }
  return result;
}
