## Hint 1

Klasy. Ustawianie `name` w bazie przez `this.constructor.name` sprawia, że każda
podklasa dostaje swoją nazwę automatycznie — ale `PropertyRequiredError` i `ReadError`
i tak ustawiają name jawnie (bo chcemy konkretne wartości):

```js
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}
export class ReadError extends Error {
  constructor(message, cause) {
    super(message, { cause }); // cause jako druga opcja konstruktora Error
    this.name = "ReadError";
  }
}
```

## Hint 2

`readUser`: cała logika w `try`, całe rozpoznawanie w `catch`. Kolejność w `catch` ma
znaczenie — najpierw `SyntaxError`, potem `ValidationError` (łapie też `PropertyRequiredError`,
bo to podklasa), a na końcu `throw err` dla nieznanych.

```js
try {
  const user = JSON.parse(json);
  if (user.name === undefined) throw new PropertyRequiredError("name");
  if (user.age === undefined) throw new PropertyRequiredError("age");
  return user;
} catch (err) {
  if (err instanceof SyntaxError) throw new ReadError("Błąd składni JSON", err);
  if (err instanceof ValidationError) throw new ReadError("Błąd walidacji", err);
  throw err; // nieznane — nie zawijaj, przepuść dalej
}
```

`readUser("null")` trafia w `throw err`: `JSON.parse("null")` daje `null`, a `null.name`
rzuca `TypeError`, który nie jest ani `SyntaxError`, ani `ValidationError`.
