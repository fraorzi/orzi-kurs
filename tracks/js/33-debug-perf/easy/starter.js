export function namesByIds(users, ids) {
  // Poprawne, ale O(n·m): dla każdego id skanujemy całą tablicę users.
  return ids.map((id) => users.find((user) => user.id === id).name);
}
