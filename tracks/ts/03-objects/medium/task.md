# Medium — słownik `Record`, `readonly` i aktualizacje bez mutacji

Stan magazynu trzymamy w słowniku `sku → liczba sztuk`. Stan jest **tylko do odczytu** —
każda zmiana zwraca nowy obiekt.

## 1. Typ `Stock`

Słownik o kluczach `string` i wartościach `number`, w całości `readonly`
(zapis `stock["abc"] = 1` ma być błędem typu).

```ts
const stock: Stock = { "mug-01": 12, "kbd-02": 3 };
```

## 2. `totalUnits(stock: Stock): number`

Suma wszystkich sztuk. Pusty magazyn daje `0`.

## 3. `withUnits(stock: Stock, sku: string, delta: number): Stock`

Nowy magazyn ze zmienioną liczbą sztuk. Zasady:

- `delta` może być ujemna (wydanie towaru),
- wynik `<= 0` **usuwa** klucz ze słownika (nie zostawiaj zer),
- nieznane `sku` z dodatnią `delta` dodaje nowy wpis,
- oryginał zostaje nietknięty.

```ts
withUnits({ a: 2 }, "a", 3);   // { a: 5 }
withUnits({ a: 2 }, "a", -2);  // {}
withUnits({ a: 2 }, "b", 1);   // { a: 2, b: 1 }
withUnits({}, "b", -1);        // {}
```

## 4. `lowStock(stock: Stock, threshold: number): string[]`

Klucze, których stan jest **poniżej** progu, posortowane alfabetycznie.

```ts
lowStock({ b: 1, a: 5, c: 2 }, 3); // ["b", "c"]
```
