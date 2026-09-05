# Easy - predykaty w filtrach

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Zaimplementuj:

- `isPresent<T>` - odrzuca wyłącznie `null` i `undefined`,
- `compact<T>` - zwraca elementy bez wartości nullish,
- `isString` - prosty strażnik bez jawnej adnotacji wyniku, aby TS wywnioskował
  predykat typu.

Nie używaj `Boolean`, `as`, `any` ani non-null assertion. `0`, `false` i pusty string
są poprawnymi wartościami.
