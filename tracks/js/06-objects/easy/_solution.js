export function countProps(obj) {
  return Object.keys(obj).length;
}

export function sumSalaries(salaries) {
  return Object.values(salaries).reduce((sum, salary) => sum + salary, 0);
}

export function renameKey(obj, from, to) {
  if (!(from in obj)) {
    return { ...obj };
  }
  const { [from]: value, ...rest } = obj;
  return { ...rest, [to]: value };
}
