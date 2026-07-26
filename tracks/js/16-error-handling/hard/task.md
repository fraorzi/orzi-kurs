# Hard — hierarchia błędów, zawijanie w `cause`, rethrow

Odwzorowanie wzorca `readUser` z javascript.info: warstwa niska rzuca konkretne błędy,
warstwa wysoka **zawija** je w jeden błąd abstrakcyjny (`ReadError`) z oryginałem w `cause`,
a błędy nieznane **przerzuca dalej** bez zmian.

Zaimplementuj w `starter.js` trzy klasy i funkcję.

## Klasy błędów

1. `class ValidationError extends Error` — nazwa błędu ma odpowiadać rzeczywistej klasie.
2. `class PropertyRequiredError extends ValidationError` — konstruktor przyjmuje `property`,
   zapisuje ją na instancji i tworzy komunikat `Brak właściwości: <property>`.
3. `class ReadError extends Error` — konstruktor przyjmuje `message` i `cause`; instancja ma
   zachować oba oraz nazwę `ReadError`.

## `readUser(json)`

1. Sparsuj `json` (niepoprawna składnia powoduje `SyntaxError`).
2. Brak `name` lub `age` zgłoś przez `PropertyRequiredError` z nazwą brakującego pola.
3. Zwróć sparsowanego użytkownika.
4. **Zawiń** błędy składni w `ReadError` z komunikatem `Błąd składni JSON`, a błędy walidacji
   w `ReadError` z komunikatem `Błąd walidacji`. Zachowaj oryginalny błąd jako `cause`.
   Każdy **inny** błąd (nieznany) przerzuć dalej bez zawijania.

```js
readUser('{"name":"Ala","age":30}');   // { name: "Ala", age: 30 }
readUser('{ zły json');                // ReadError, .cause instanceof SyntaxError
readUser('{"age":30}');                // ReadError, .cause instanceof PropertyRequiredError
readUser('null');                      // nieznany błąd (TypeError) — przerzucony, NIE ReadError
```
