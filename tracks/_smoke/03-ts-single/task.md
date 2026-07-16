# Zliczanie tagów (TypeScript, jednoplikowo)

Napisz funkcję `tagCounts(entries)`, która zlicza wystąpienia tagów we wpisach.
Zadanie ma **dwie części**:

1. **Typ** — zastąp `unknown` w aliasie `TagCounts` właściwym typem wyniku
   (mapa: tag → liczba wystąpień).
2. **Implementacja** — policz tagi, nie mutując wejścia.

Testy sprawdzają jedno i drugie: asercje runtime (`expect`) oraz asercje typów
(`Expect<Equal<…>>` z `@harness/type-assert`). Błąd typu oblewa zadanie tak samo
jak czerwony test.

## Sygnatura

```ts
export interface Entry {
  id: number;
  tags: string[];
}

export type TagCounts = unknown; // ← do zastąpienia

export function tagCounts(entries: Entry[]): TagCounts;
```

## Przykłady

| wejście                                          | wynik              |
| ------------------------------------------------ | ------------------ |
| `[{ id: 1, tags: ["ts", "js"] }, { id: 2, tags: ["ts"] }]` | `{ ts: 2, js: 1 }` |
| `[{ id: 3, tags: [] }]`                          | `{}`               |
| `[]`                                             | `{}`               |
