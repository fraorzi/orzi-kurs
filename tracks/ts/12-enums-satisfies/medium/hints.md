## Hint 1

Bez `as const` wartości mają typ `number`, a `LevelValue` byłoby bezużyteczne. Z `as const`:

```ts
export type LevelName = keyof typeof LOG_LEVEL;
export type LevelValue = (typeof LOG_LEVEL)[LevelName];
```

Klucze i wartości wypadają z jednego źródła prawdy.

## Hint 2

`shouldLog` to porównanie dwóch odczytów ze słownika:
`LOG_LEVEL[message] >= LOG_LEVEL[minimum]`. Nie potrzeba żadnej tablicy kolejności —
liczby ją kodują.

## Hint 3

Walidacja stringa z zewnątrz bez `as`: napisz strażnik typu.

```ts
function isLevelName(input: string): input is LevelName {
  return Object.hasOwn(LOG_LEVEL, input);
}
```

`Object.hasOwn` (ES2022) sprawdza własny klucz obiektu — bezpieczniej niż `input in
LOG_LEVEL` (to drugie widzi też prototyp).

## Hint 4

Mając strażnik, `parseLevel` to jedna linijka:
`return isLevelName(input) ? input : null;` — kompilator sam zawęża `input` do `LevelName`.

## Hint 5

`levelName` (odwrotne mapowanie): przejdź `Object.keys(LOG_LEVEL)` i porównaj wartości.
Klucze z `Object.keys` mają typ `string`, więc przepuść je przez ten sam strażnik — wtedy
indeksowanie `LOG_LEVEL[name]` się skompiluje.
