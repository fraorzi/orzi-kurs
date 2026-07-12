export function getAge(user) {
  // TODO: zwróć user.age; gdy undefined — rzuć Error("brak pola: age")
}

export function readAgeOrDefault(user) {
  // TODO: zwróć getAge(user); przy błędzie złap i zwróć 0
}

export function withCleanup(fn, cleanup) {
  // TODO: zwróć fn(); ZAWSZE wywołaj cleanup() (finally)
}
