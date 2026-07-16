# Unie, zawężanie i typy rozłączne

Unia `A | B` mówi: „wartość jest jednym z tych typów, ale nie wiem którym”. Zanim jej
użyjesz jak `A`, musisz kompilatorowi **udowodnić**, że to `A`. To dowodzenie nazywa się
zawężaniem (narrowing) — i robisz je zwykłym JS-em, nie składnią typów.

## Zawężanie, którego już używasz

```ts
function pad(value: string | number): string {
  if (typeof value === "number") {
    return " ".repeat(value);   // tutaj value: number
  }
  return value;                 // tutaj value: string
}
```

TS rozumie kanoniczne wzorce JS:

- `typeof x === "string" | "number" | "boolean" | "object" | "function" | "undefined"`,
- `x === null`, `x == null` (łapie `null` i `undefined` naraz),
- truthiness (`if (x)`) — ale uwaga na `0` i `""`,
- `Array.isArray(x)`,
- `"pole" in obiekt`,
- `x instanceof Klasa`,
- porównanie z literałem (`if (status === "draft")`),
- `switch` po literale.

## Typy rozłączne (discriminated unions)

Najważniejszy wzorzec w codziennym TS. Każdy wariant unii dostaje wspólne pole
**dyskryminujące** o typie literalnym:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle": return Math.PI * shape.radius ** 2;  // shape: circle
    case "square": return shape.side ** 2;              // shape: square
  }
}
```

Kompilator wie, że w gałęzi `"circle"` istnieje `radius`, a `side` już nie. Bez pola
dyskryminującego (`{ radius?: number; side?: number }`) musiałbyś zgadywać po `undefined`.

## Wyczerpanie unii przez `never`

`never` to typ bez żadnej wartości. Jeśli zawęzisz unię do końca, zostaje `never` —
i to jest bramka, która **przy dodaniu nowego wariantu** zepsuje kompilację w dokładnie
tym miejscu, gdzie brakuje obsługi:

```ts
default: {
  const exhaustive: never = shape;   // błąd, gdy dojdzie nowy kind
  throw new Error(`nieznany kształt: ${JSON.stringify(exhaustive)}`);
}
```

## Własne strażniki typów (`x is T`)

Gdy warunek jest zbyt złożony dla kompilatora, opisujesz go funkcją zwracającą **predykat
typu**:

```ts
function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

if (isNonEmptyString(input)) {
  input.toUpperCase();   // input: string
}
```

Predykat to obietnica, której kompilator **nie sprawdza** — jeśli skłamiesz w ciele
funkcji, zawężenie będzie błędne. To ta sama klasa ryzyka co `as`.

## `unknown` zamiast `any`

`unknown` = „nie wiem, co to”, ale nic nie wolno z tym zrobić bez zawężenia. `any` =
„nie sprawdzaj niczego” i zaraża cały łańcuch wyrażeń. Do danych z zewnątrz (JSON, fetch)
używaj `unknown` i zawężaj.

## Kiedy używać

- Unia literałów zamiast `string` wszędzie, gdzie zbiór wartości jest zamknięty (statusy,
  role, tryby) — kompilator złapie literówkę.
- Discriminated union do modelowania stanów, które **wykluczają się wzajemnie**:
  `{ status: "loading" } | { status: "ok"; data: T } | { status: "error"; error: string }`.
  Nie da się wtedy mieć `data` i `error` naraz — model nie dopuszcza stanu, który nie istnieje.
- `never` w `default`, żeby dodanie wariantu było błędem kompilacji, nie cichym bugiem.

## Kiedy unikać

- Unia z pięcioma opcjonalnymi polami zamiast dyskryminatora — dostaniesz kod pełen
  `if (x.a !== undefined)`.
- Predykat `x is T` tam, gdzie wystarczy zwykły `typeof`/`in` — kompilator sam to zawęzi.
- `as` do „naprawienia” błędu zawężania. `as` niczego nie sprawdza; jeśli się mylisz,
  dostajesz `undefined is not a function` w runtime.

## Pułapki

- Truthiness gubi `0` i `""`: `if (count)` nie odróżni braku wartości od zera. Do zawężania
  `number | undefined` używaj `!== undefined`.
- `typeof null === "object"` — klasyczna pułapka JS. `if (typeof x === "object")` nie
  wyklucza `null`; sprawdź `x !== null` osobno.
- Zawężenie **wygasa** po wywołaniu funkcji, jeśli wartość jest polem mutowalnego obiektu
  (kompilator zakłada, że mogła się zmienić). Przypisz do lokalnej `const`.
- Zawężenie przez pole opcjonalne w `in` działa, ale `in` nie sprawdza typu wartości.

Źródła: TypeScript Handbook — „Narrowing”, „Unions and Intersection Types”,
„Discriminated Unions”, „Type Predicates”; Effective TypeScript, rozdz. o `unknown`.
