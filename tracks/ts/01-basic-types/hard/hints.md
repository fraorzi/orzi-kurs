## Hint 1

`as const` działa rekurencyjnie: jedna asercja na całym literale `CONFIG` zamraża też
`api` i `features`. Nie musisz jej powtarzać w środku.

## Hint 2

Typ wartości bierzesz przez `typeof`, a jego fragmenty — przez indeksowanie:

```ts
export type Config = typeof CONFIG;
export type ApiConfig = Config["api"];
export type FeatureFlag = Config["features"][number];
```

## Hint 3

`describeApi` dostaje `readonly` obiekt — czytanie pól jest w porządku, zapis nie.
Do sklejenia stringa użyj szablonu.

## Hint 4

`withTimeout` nie może modyfikować wejścia (jest `readonly`), więc rozłóż je spreadem
i nadpisz jedno pole: `{ ...api, timeoutMs }`. Spread na `readonly` daje zwykły,
mutowalny obiekt — dokładnie to obiecuje sygnatura.

## Hint 5

`CONFIG.features.includes(flag)` na readonly tuple działa, bo `flag` ma typ z tej samej
unii. Gdyby `flag` był `string`, kompilator odmówiłby — i słusznie.
