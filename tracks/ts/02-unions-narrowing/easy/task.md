# Easy - zawężanie unii

Tryb: od zera. Napisz rozwiązanie w `starter.ts`, korzystając z podanych sygnatur i typów.

Trzy funkcje pracujące na uniach. Zawężaj zwykłym JS-em (`typeof`, `Array.isArray`,
porównanie z `null`) - bez `as` i bez `any`.

## 1. `formatValue(value: string | number | boolean): string`

```ts
formatValue("abc");  // "abc"
formatValue(12.5);   // "12.50"      - liczby z dwoma miejscami po przecinku
formatValue(true);   // "tak"
formatValue(false);  // "nie"
```

## 2. `charCount(value: string | string[]): number`

Liczba znaków: dla stringa jego długość, dla tablicy **suma** długości elementów.

```ts
charCount("abc");           // 3
charCount(["a", "bb"]);     // 3
charCount([]);              // 0
```

## 3. `orDefault(value: string | null | undefined, fallback: string): string`

Zwraca `value`, o ile nie jest `null`/`undefined`. **Pusty string to poprawna wartość** -
nie podmieniaj go na `fallback`.

```ts
orDefault("abc", "-");   // "abc"
orDefault("", "-");      // ""      ← uwaga: nie "-"
orDefault(null, "-");    // "-"
orDefault(undefined, "-"); // "-"
```
