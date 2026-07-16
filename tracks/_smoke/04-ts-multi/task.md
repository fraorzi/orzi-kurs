# Podsumowanie koszyka (TypeScript, wieloplikowo)

Kod jest rozbity na trzy pliki w `src/`:

- `src/types.ts` — typ pozycji `CartLine` i alias wyniku `CartSummary` (do uzupełnienia).
- `src/cart.ts` — `lineTotal(line)`: wartość pojedynczej pozycji.
- `src/index.ts` — `summarize(lines)`: łączne podsumowanie koszyka.

Uzupełnij **wszystkie trzy**: zastąp `unknown` w `CartSummary` właściwym typem
(`{ total: number; items: number }`), policz wartość pozycji i podsumuj koszyk.
Nie mutuj wejścia.

Testy sprawdzają runtime (`expect`) **i** typy (`Expect<Equal<…>>` z `@harness/type-assert`).

## Sygnatura

```ts
// src/types.ts
export interface CartLine {
  sku: string;
  price: number;
  qty: number;
}
export type CartSummary = unknown; // ← do zastąpienia

// src/cart.ts
export function lineTotal(line: CartLine): number;

// src/index.ts
export function summarize(lines: CartLine[]): CartSummary;
```

## Przykłady

| wejście                                                        | wynik                        |
| -------------------------------------------------------------- | ---------------------------- |
| `[{ sku: "a", price: 10, qty: 2 }, { sku: "b", price: 5, qty: 1 }]` | `{ total: 25, items: 3 }`    |
| `[]`                                                           | `{ total: 0, items: 0 }`     |
