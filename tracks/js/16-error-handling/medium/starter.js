export class ValidationError extends Error {
  // TODO: konstruktor(message) — super(message) + this.name = "ValidationError"
}

export function validateUser(user) {
  // TODO: waliduj name (niepusty string) i age (liczba); rzuć ValidationError albo zwróć user
}
