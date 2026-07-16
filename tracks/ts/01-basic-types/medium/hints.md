## Hint 1

Bez `as const` pola obiektu dostają typ szeroki (`string`), bo obiekt jest mutowalny.
Dopisz `as const` do literału `STATUS`.

## Hint 2

Unia wartości mapy = indeksowanie typu unią jego kluczy:

```ts
export type Status = (typeof STATUS)[keyof typeof STATUS];
```

`keyof typeof STATUS` to `"draft" | "review" | "published"` (klucze), a indeksowanie
tą unią daje unię wartości.

## Hint 3

`Record<Status, string>` wymusza komplet kluczy — jeśli pominiesz `review`, kompilator
zgłosi brakującą właściwość. To dokładnie ta bramka, którą sprawdza test.

## Hint 4

`nextStatus` da się napisać bez `if`/`switch`: mapa przejść `Record<Status, Status>`
i jedno indeksowanie. Mniej kodu, a kompilator pilnuje kompletu przejść.
