# Hard — hierarchia błędów, zawijanie w `cause`, rethrow

Odwzorowanie wzorca `readUser` z javascript.info: warstwa niska rzuca konkretne błędy,
warstwa wysoka **zawija** je w jeden błąd abstrakcyjny (`ReadError`) z oryginałem w `cause`,
a błędy nieznane **przerzuca dalej** bez zmian.

Zaimplementuj w `starter.js` trzy klasy i funkcję.

## Klasy błędów

1. `class ValidationError extends Error` — `this.name = this.constructor.name`.
2. `class PropertyRequiredError extends ValidationError` — konstruktor przyjmuje `property`,
   ustawia `message` na `` `Brak właściwości: ${property}` ``, `this.name = "PropertyRequiredError"`
   i zapisuje `this.property = property`.
3. `class ReadError extends Error` — konstruktor `(message, cause)`, przekazuje
   `super(message, { cause })`, `this.name = "ReadError"`.

## `readUser(json)`

1. Sparsuj `json` przez `JSON.parse` (może rzucić `SyntaxError`).
2. Jeśli brakuje `name` → rzuć `new PropertyRequiredError("name")`.
   Jeśli brakuje `age` → `new PropertyRequiredError("age")`.
3. Zwróć sparsowanego użytkownika.
4. **Zawiń** w `catch`: `SyntaxError` → `new ReadError("Błąd składni JSON", err)`,
   `ValidationError` (i podklasy) → `new ReadError("Błąd walidacji", err)`.
   Każdy **inny** błąd (nieznany) — **przerzuć dalej** (`throw err`) bez zawijania.

```js
readUser('{"name":"Ala","age":30}');   // { name: "Ala", age: 30 }
readUser('{ zły json');                // ReadError, .cause instanceof SyntaxError
readUser('{"age":30}');                // ReadError, .cause instanceof PropertyRequiredError
readUser('null');                      // nieznany błąd (TypeError) — przerzucony, NIE ReadError
```
