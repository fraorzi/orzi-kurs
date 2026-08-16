export function countProps(obj) {
  return Object.keys(obj).length;
}

export function sumSalaries(salaries) {
  return Object.values(salaries).reduce(
    (sum, salary) => sum + salary,
    0,
  );
}

export function renameKey(obj, from, to) {
  const entries = Object.entries(obj).map(
    ([key, value]) => [key === from ? to : key, value],
  );
  return Object.fromEntries(entries);
}
