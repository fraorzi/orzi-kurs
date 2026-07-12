export function uniqueByEmail(users) {
  // Poprawne, ale O(n²): findIndex skanuje całą tablicę dla każdego elementu.
  return users.filter(
    (user, i) => users.findIndex((other) => other.email === user.email) === i,
  );
}
