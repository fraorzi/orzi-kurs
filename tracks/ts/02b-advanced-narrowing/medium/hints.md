## Hint 1

Najpierw wyklucz prymitywy, `null` i tablice. Operator `"apiUrl" in value` pozwoli
bezpiecznie odczytać pole.

## Hint 2

Assertion function ma wynik `asserts value is RuntimeConfig`, nie `boolean`.

## Hint 3

Po `assertRuntimeConfig(value)` kompilator zna wszystkie pola. Zwróć spread z
nadpisanym `apiUrl`, aby nie mutować danych wejściowych.
