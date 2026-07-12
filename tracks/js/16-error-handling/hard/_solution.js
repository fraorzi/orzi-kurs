export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super(`Brak właściwości: ${property}`);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}

export class ReadError extends Error {
  constructor(message, cause) {
    super(message, { cause });
    this.name = "ReadError";
  }
}

export function readUser(json) {
  try {
    const user = JSON.parse(json);
    if (user.name === undefined) {
      throw new PropertyRequiredError("name");
    }
    if (user.age === undefined) {
      throw new PropertyRequiredError("age");
    }
    return user;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Błąd składni JSON", err);
    }
    if (err instanceof ValidationError) {
      throw new ReadError("Błąd walidacji", err);
    }
    throw err;
  }
}
