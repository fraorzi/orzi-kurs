# Medium - własna klasa błędu i walidacja

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

Rozróżnianie rodzajów błędów robi się przez **klasy dziedziczące po `Error`**, nie przez
porównywanie tekstu komunikatu. Zaimplementuj w `starter.js`:

## 1. `class ValidationError extends Error`

Klasa błędu walidacji. Konstruktor przyjmuje `message`, przekazuje go do `super(...)`
i ustawia `this.name` na `"ValidationError"` (a nie odziedziczone `"Error"`).

```js
const e = new ValidationError("złe dane");
e.message;                      // "złe dane"
e.name;                         // "ValidationError"
e instanceof ValidationError;   // true
e instanceof Error;             // true
```

## 2. `validateUser(user)`

Waliduje obiekt użytkownika i zwraca go, gdy jest poprawny. W przeciwnym razie rzuca
`ValidationError` z opisowym komunikatem:

- `name` musi być **niepustym stringiem** - inaczej rzuć
  `new ValidationError("name musi być niepustym stringiem")`,
- `age` musi być **liczbą** - inaczej rzuć
  `new ValidationError("age musi być liczbą")`.

Sprawdzaj `name` przed `age`. Gdy oba są OK - zwróć `user`.

```js
validateUser({ name: "Ala", age: 30 }); // { name: "Ala", age: 30 }
validateUser({ name: "", age: 30 });    // ValidationError: name musi być niepustym stringiem
validateUser({ name: "Ala" });          // ValidationError: age musi być liczbą
```
