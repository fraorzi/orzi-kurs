## Hint 1

Przeciążenia to **osobne deklaracje bez ciała**, postawione bezpośrednio nad implementacją:

```ts
export function range(stop: number): number[];
export function range(start: number, stop: number): number[];
export function range(start: number, stop: number, step: number): number[];
export function range(a: number, b?: number, step = 1): number[] {
  …
}
```

Z zewnątrz widoczne są tylko trzy pierwsze linijki — dlatego `range()` i `range(1,2,3,4)`
są błędami, mimo że implementacja przyjmuje trzy parametry.

## Hint 2

Rozróżnienie „jeden argument czy dwa” zrobisz przez `b === undefined`:

```ts
const start = b === undefined ? 0 : a;
const stop = b === undefined ? a : b;
```

## Hint 3

Krok ujemny zmienia warunek pętli. Dwa oddzielne `for`y (`i < stop` dla dodatniego,
`i > stop` dla ujemnego) są czytelniejsze niż jeden z warunkiem sklejonym z `||`.

## Hint 4

`parseSetting` ma dwie sygnatury i jedną implementację przyjmującą unię. W ciele zawężasz
przez `typeof`. Kluczowe: sygnatura implementacji (`string | number` → `boolean | string`)
**nie jest** widoczna dla wywołujących, dlatego `parseSetting("on")` ma typ `boolean`,
a nie unię.

## Hint 5

`assertNever(value: never): never` przyjmuje tylko wartość, której typ został zawężony do
`never`. W `describeSetting` po sprawdzeniu `typeof value === "string"` i `=== "number"`
nie zostaje nic — i dopiero wtedy wywołanie się kompiluje.
