# Hard - filtrowanie kluczy po typie wartości i naprawa DeepPartial

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

## 1. `KeysOfType<T, V>`

Unia kluczy `T`, których wartość jest przypisywalna do `V`.

```ts
interface Row { id: number; name: string; score: number; active: boolean }

KeysOfType<Row, number>;   // "id" | "score"
KeysOfType<Row, string>;   // "name"
KeysOfType<Row, Date>;     // never
```

## 2. `PickByType<T, V>` i `OmitByType<T, V>`

```ts
PickByType<Row, number>;  // { id: number; score: number }
OmitByType<Row, number>;  // { name: string; active: boolean }
```

## 3. `pickByType`

Runtime'owy odpowiednik typów z poprzedniej części: przyjmuje obiekt oraz strażnik typu
i zostawia pola, dla których strażnik zwraca `true`. Typ wyniku ma być wyliczony przez
`PickByType`.

```ts
const isNumber = (v: unknown): v is number => typeof v === "number";

pickByType({ id: 1, name: "Ala", score: 9 }, isNumber);  // { id: 1, score: 9 }
```

## 4. `DeepPartialSafe<T>` - naprawa pułapki z zagadnienia 08

`DeepPartial` z mapped type'u robił opcjonalne **elementy** tablicy (`(string | undefined)[]`).
Tutaj tablica ma zostać tablicą, a opcjonalne mają być tylko pola obiektów.

```ts
DeepPartialSafe<{ tags: string[]; theme: { color: string } }>;
// { tags?: string[]; theme?: { color?: string } }

DeepPartialSafe<{ items: { id: number }[] }>;
// { items?: { id?: number }[] }     ← w głąb elementów, ale bez undefined w tablicy
```

Kolejność gałęzi ma znaczenie: tablicę sprawdzasz **przed** obiektem (tablica też jest
obiektem). Prymityw zwracasz bez zmian.

## Ograniczenia

- `pickByType` nie mutuje źródła.
- Nie używaj wbudowanego `Extract` w `KeysOfType` - chodzi o to, żeby napisać ten typ
  samodzielnie.
