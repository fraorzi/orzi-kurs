export function filterRange(arr, a, b) {
  return arr.filter((item) => item >= a && item <= b);
}

export function sortByAge(users) {
  return [...users].sort((x, y) => x.age - y.age);
}

export function unique(arr) {
  return [...new Set(arr)];
}

export function groupById(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
}
