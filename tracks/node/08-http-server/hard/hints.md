## Hint 1

Rozpoznanie walidacji: `error instanceof Error && error.name ===
"ValidationError"` — samo `instanceof` nie wystarczy.

## Hint 2

Ścieżka 500 nie czyta z błędu **niczego** — ani message, ani stack. To nie
przypadek, test szuka wycieków w zserializowanej odpowiedzi.

## Hint 3

Sygnatura przyjmuje `unknown` — obsłuż też rzucony string i `undefined`,
w JS `throw` przyjmuje dowolną wartość.
