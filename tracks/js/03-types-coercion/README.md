# Typy i konwersje

JS ma 8 typów: `number`, `bigint`, `string`, `boolean`, `null`, `undefined`,
`symbol` i `object`. Operator `typeof` zwraca nazwę typu — z jednym słynnym
wyjątkiem:

```js
typeof 42;        // "number"
typeof "abc";     // "string"
typeof undefined; // "undefined"
typeof null;      // "object"  ← historyczny błąd języka, nie do naprawienia
typeof (() => 0); // "function" (funkcje to obiekty, ale typeof je wyróżnia)
```

## Truthy i falsy

W kontekście logicznym (`if`, `!`, `&&`) wartość jest konwertowana na boolean.
Falsy jest dokładnie **osiem** wartości: `false`, `0`, `-0`, `0n`, `""`, `null`,
`undefined`, `NaN`. **Wszystko inne jest truthy** — w tym `"0"`, `" "`, `[]`, `{}`.

## Konwersje jawne

```js
Number("12");   // 12
Number("  12 ");// 12 — białe znaki są przycinane
Number("");     // 0  ← pułapka! pusty string to 0, nie NaN
Number("12px"); // NaN
String(42);     // "42"
Boolean(value); // to samo co !!value
```

## `==` vs `===`

`===` porównuje bez konwersji: inny typ → `false`. `==` przed porównaniem
**konwertuje** operandy według algorytmu:

- `null` i `undefined` są równe **sobie nawzajem** i niczemu innemu,
- string ↔ number: string konwertowany na liczbę,
- boolean → number (`true` → 1, `false` → 0),
- obiekt ↔ prymityw: obiekt konwertowany na prymityw (`valueOf`, potem `toString`),
- ten sam typ: jak `===`.

Stąd absurdy: `0 == ""` (oba → 0), `"1" == true` (oba → 1), ale `null == 0`
to `false` (null równa się tylko undefined). W tym repo lint (`eqeqeq`) wymusza
`===` — algorytm `==` trzeba znać, żeby czytać cudzy kod, nie żeby go używać.

## NaN i Object.is

`NaN` to jedyna wartość nierówna samej sobie: `NaN === NaN` → `false`.
Sprawdzanie: `Number.isNaN(x)`. Trzeci rodzaj równości — `Object.is` —
działa jak `===`, ale `Object.is(NaN, NaN)` → `true`
i `Object.is(0, -0)` → `false`.

## Kiedy używać

- `===` zawsze; `typeof` do sprawdzania typów prymitywnych,
- konwersje jawne (`Number(x)`, `String(x)`, `Boolean(x)`) na granicach systemu:
  input użytkownika, URL, localStorage,
- `Number.isNaN` / `Number.isFinite` do walidacji wyników parsowania.

## Kiedy unikać

- `==` — poza czytaniem legacy kodu; lint tego repo blokuje,
- niejawnych konwersji jako "sprytnych" skrótów (`+str`, `!!x` w publicznym API),
- porównań `x === NaN` — zawsze `false`, użyj `Number.isNaN(x)`.

## Pułapki

- `typeof null === "object"`,
- `Number("") === 0` i `Number(" ") === 0` — walidacja stringów liczbowych musi
  odrzucić pusty string ZANIM skonwertuje,
- `NaN` zaraża arytmetykę (`NaN + 1` → `NaN`) i jest falsy,
- `[] == false` → `true` (`[]` → `""` → `0`), ale `[]` jest truthy — `if ([])`
  wchodzi do gałęzi,
- `null == 0` → `false`, ale `null >= 0` → `true` (porównania relacyjne konwertują
  inaczej niż `==`).
