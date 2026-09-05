# Medium - walidacja przy zapisie przez `set`

Tryb: od zera. Napisz rozwiązanie w `starter.js`, korzystając z podanych sygnatur i typów.

## `withValidation(target, validators)`

Zwróć `Proxy`, który przy **zapisie** sprawdza wartość regułą z `validators`. `validators` to
obiekt `{ [klucz]: (value) => boolean }`.

- Jeśli dla ustawianego klucza jest reguła i zwraca `false` → rzuć
  `TypeError` z komunikatem `` `niepoprawna wartość dla ${key}` ``, **nie** zapisując.
- Jeśli reguła zwraca `true` albo klucza nie ma w `validators` → zapisz normalnie.

```js
const user = withValidation(
  { age: 30 },
  { age: (v) => Number.isInteger(v) && v >= 0 && v <= 150 },
);

user.age = 40;   // OK
user.name = "x"; // OK - brak reguły dla name
user.age = -5;   // TypeError: niepoprawna wartość dla age
user.age;        // 40  (nieudany zapis nie zmienił wartości)
```

Poprawny zapis ma zachować standardowy kontrakt pułapki `set`, łącznie z wynikiem typu
`boolean`.
