export function extractUser(user) {
  const { name, years, isAdmin = false } = user;
  return [name, years, isAdmin];
}

export function topSalary(salaries) {
  let top = null;
  let max = -Infinity;
  for (const [name, salary] of Object.entries(salaries)) {
    if (salary > max) {
      max = salary;
      top = name;
    }
  }
  return top;
}

export function mergeSettings(defaults, overrides) {
  const merged = { ...defaults, ...overrides };
  if (defaults.flags || overrides.flags) {
    merged.flags = [...(defaults.flags ?? []), ...(overrides.flags ?? [])];
  }
  return merged;
}
