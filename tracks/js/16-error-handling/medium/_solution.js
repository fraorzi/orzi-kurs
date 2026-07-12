export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

export function validateUser(user) {
  if (typeof user.name !== "string" || user.name === "") {
    throw new ValidationError("name musi być niepustym stringiem");
  }
  if (typeof user.age !== "number") {
    throw new ValidationError("age musi być liczbą");
  }
  return user;
}
