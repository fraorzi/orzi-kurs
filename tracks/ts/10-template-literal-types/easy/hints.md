## Hint 1

Template literal type wygląda jak template string z JS, tylko stoi w pozycji typu —
w dziurę wstawiasz **typ**, nie wartość:

```ts
export type CssVar<Name extends string> = `--${Name}`;
```

`CssVar<"gap">` to teraz literał `"--gap"`.

## Hint 2

`Capitalize<T>` i `Uppercase<T>` to typy wbudowane w kompilator — użyj ich w dziurze:

```ts
export type HandlerName<Event extends string> = `on${Capitalize<Event>}`;
```

Dla `EnvKey` najpierw sklej prefiks, potem podnieś **całość**:
`Uppercase<`app_${Name}`>`. Odwrotna kolejność też zadziała, ale ta czyta się najprościej.

## Hint 3

Unia wartości tablicy `as const` to indeksowanie typem `number`:

```ts
export type Size = (typeof SIZES)[number];   // "sm" | "md" | "lg"
```

`typeof SIZES` to `readonly ["sm", "md", "lg"]`, a `[number]` wyciąga unię wszystkich
elementów.

## Hint 4

`Variant` to jedna linijka — unia w dziurze rozmnaża się sama na wszystkie kombinacje:

```ts
export type Variant = `${Size}-${Tone}`;   // 3 × 2 = 6 członów
```

Nie wypisuj tych sześciu wariantów ręcznie — o to właśnie chodzi w tym zadaniu.

## Hint 5

W runtime sklejanie stringów zawsze daje `string`, więc kompilator potrzebuje pomocy.
Dla `cssVar` wystarczy sam template string (TS sam dopasuje go do `` `--${Name}` ``):

```ts
return `--${name}`;
```

Dla `handlerName` i `envKey` trzeba asercji, bo `toUpperCase()` gubi literał:

```ts
return `app_${name}`.toUpperCase() as EnvKey<Name>;
```

## Hint 6

`isVariant` dostaje **zwykły** `string` (np. z formularza), więc musi sprawdzić wszystko
w runtime. Rozbij na człony i policz je — bez tego `"sm-primary-x"` przejdzie:

```ts
const parts = value.split("-");
if (parts.length !== 2) return false;
const [size, tone] = parts;
return (SIZES as readonly string[]).includes(size)
  && (TONES as readonly string[]).includes(tone);
```

Rzutowanie na `readonly string[]` jest potrzebne, bo `SIZES.includes` przyjmuje tylko
`"sm" | "md" | "lg"`, a `size` jest zwykłym stringiem.
