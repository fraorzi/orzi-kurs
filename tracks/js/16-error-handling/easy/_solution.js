export function getAge(user) {
  if (user.age === undefined) {
    throw new Error("brak pola: age");
  }
  return user.age;
}

export function readAgeOrDefault(user) {
  try {
    return getAge(user);
  } catch {
    return 0;
  }
}

export function withCleanup(fn, cleanup) {
  try {
    return fn();
  } finally {
    cleanup();
  }
}
