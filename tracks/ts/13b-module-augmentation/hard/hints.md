## Hint 1

W `payments.ts` dodaj `declare module "./events" { interface AppEvents { ... } }`.

## Hint 2

Zapisz funkcje odpinające zwrócone przez oba `bus.on`.

## Hint 3

Wspólne unsubscribe wywołuje obie funkcje. Kwotę formatuj przez `toFixed(2)`.
