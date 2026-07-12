export class ValidationError extends Error {
  // TODO: super(message) + this.name = this.constructor.name
}

export class PropertyRequiredError extends ValidationError {
  // TODO: konstruktor(property): message "Brak właściwości: <property>",
  //       name = "PropertyRequiredError", zapisz this.property
}

export class ReadError extends Error {
  // TODO: konstruktor(message, cause): super(message, { cause }) + name = "ReadError"
}

export function readUser(json) {
  // TODO: JSON.parse; walidacja name/age (PropertyRequiredError);
  //       w catch zawiń SyntaxError i ValidationError w ReadError(..., err),
  //       inne błędy przerzuć dalej (throw err)
}
