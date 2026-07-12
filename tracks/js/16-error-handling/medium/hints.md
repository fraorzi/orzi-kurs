## Hint 1

Konstruktor podklasy `Error` musi najpierw wywołać `super(message)` (ustawia `message`),
a dopiero potem może ustawić własne pola:

```js
export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}
```

Bez `this.name = ...` odziedziczysz `name === "Error"`.

## Hint 2

`validateUser`: dwa warunki, w tej kolejności. Do sprawdzenia „niepusty string" użyj
`typeof user.name !== "string" || user.name === ""`. Do „liczba" użyj
`typeof user.age !== "number"`. Gdy warunek błędu spełniony — `throw new ValidationError(...)`.
Na końcu, jeśli nic nie rzuciło, `return user`.
