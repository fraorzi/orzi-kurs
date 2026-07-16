# Easy — sygnatury, parametry i callbacki

## 1. `greet(name: string, greeting?: string): string`

Domyślne powitanie: `"Cześć"`.

```ts
greet("Ala");            // "Cześć, Ala!"
greet("Ala", "Siema");   // "Siema, Ala!"
```

## 2. `sum(...numbers: number[]): number`

```ts
sum();            // 0
sum(1, 2, 3);     // 6
```

## 3. Typ `Mapper` i `mapNumbers`

```ts
type Mapper = (value: number, index: number) => number;

mapNumbers([10, 20], (value, index) => value + index);  // [10, 21]
```

`mapNumbers(items: readonly number[], fn: Mapper): number[]` — nie mutuje wejścia.

Callback z **mniejszą** liczbą parametrów też ma działać: `mapNumbers([1, 2], (v) => v * 2)`.

## 4. `fail(message: string): never`

Rzuca `Error` z podanym komunikatem. Typ zwracany to `never` — kod po wywołaniu jest
nieosiągalny.

```ts
const value = maybe ?? fail("brak wartości");  // value nie jest już null
```
